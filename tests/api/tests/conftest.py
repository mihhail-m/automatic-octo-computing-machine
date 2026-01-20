import json
import os
import pytest
import requests

from typing import Dict
from requests import Session


@pytest.fixture(scope="session")
def api_base_url():
    # hardcoded for example purposes
    return os.getenv("API_BASE_URL", "http://127.0.0.1:80")


@pytest.fixture(scope="session")
def access_token(api_base_url: str):
    # hardcoded for example purposes
    credentials = json.dumps({"username": "alice", "password": "password123"})
    url = f"{api_base_url}/login"

    with requests.Session() as s:
        req = s.post(url=url, data=credentials)
        res = req.json()

        return res["access_token"]


@pytest.fixture(scope="session")
def api_headers(access_token: str) -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="session")
def session(api_headers) -> Session:
    s = Session()
    s.headers.update(api_headers)

    return s
