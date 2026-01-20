import time
import uuid
from collections import defaultdict, deque
from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI(title="Mock User API", version="1.0.0")

# -------------------------
# In-memory data
# -------------------------

USERS = {
    "alice": {"password": "password123", "id": 1, "email": "alice@test.com"},
    "bob": {"password": "password123", "id": 2, "email": "bob@test.com"},
}

USER_DATA = {
    1: {"id": 1, "name": "Alice", "role": "admin"},
    2: {"id": 2, "name": "Bob", "role": "user"},
}

TOKENS: dict[str, str] = {}

# -------------------------
# Rate limiting
# -------------------------

RATE_LIMITS = {
    "users_me": 3,
    "users": 3,
    "user_by_id": 4,
}

WINDOW_SECONDS = 1
request_log: dict[str, dict[str, deque]] = defaultdict(lambda: defaultdict(deque))


def check_rate_limit(token: str, key: str):
    now = time.time()
    timestamps = request_log[token][key]

    while timestamps and timestamps[0] < now - WINDOW_SECONDS:
        timestamps.popleft()

    if len(timestamps) >= RATE_LIMITS[key]:
        raise HTTPException(
            status_code=429,
            detail="Too Many Requests",
            headers={"Retry-After": "1"},
        )

    timestamps.append(now)


# -------------------------
# Auth dependency
# -------------------------


def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ")[1]
    user = TOKENS.get(token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return token, user


# -------------------------
# Schemas
# -------------------------


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str


# -------------------------
# Endpoints
# -------------------------


@app.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = USERS.get(payload.username)

    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = str(uuid.uuid4())
    TOKENS[token] = payload.username
    return {"access_token": token}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/users/me")
def users_me(auth=Depends(get_current_user)):
    token, username = auth
    check_rate_limit(token, "users_me")
    user = USERS[username]
    return {"username": username, "email": user["email"]}


@app.get("/users")
def users(auth=Depends(get_current_user)):
    token, _ = auth
    check_rate_limit(token, "users")
    return list(USER_DATA.values())


@app.get("/users/{user_id}")
def user_by_id(user_id: int, auth=Depends(get_current_user)):
    token, _ = auth
    check_rate_limit(token, "user_by_id")

    user = USER_DATA.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
