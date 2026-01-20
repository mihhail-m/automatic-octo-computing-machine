from requests import Session


def test_get_users(session: Session, api_base_url):
    url = f"{api_base_url}/users"

    with session as s:
        res = s.get(url)
        data = res.json()

        assert len(data) == 2


def test_get_user_by_id(session: Session, api_base_url):
    url = f"{api_base_url}/users/1"

    with session as s:
        res = s.get(url)
        data = res.json()

        assert data is not None
        assert data["id"] == 1
