# Installation 

1. Build docker image

```sh
docker build -t mock-user-api -f Dockerfile .
```

2. Run it

```sh
docker run -i mock-user-api -p 80:80
```

# Usage

* Inspect `http://127.0.0.1:80/docs` for API documentation

## Available users

```python

USERS = {
    "alice": {"password": "password123", "id": 1, "email": "alice@test.com"},
    "bob": {"password": "password123", "id": 2, "email": "bob@test.com"},
}
```

## Rate limits

```py
RATE_LIMITS = {
    "users_me": 3,
    "users": 3,
    "user_by_id": 4,
}
```

For more details see code.
```
