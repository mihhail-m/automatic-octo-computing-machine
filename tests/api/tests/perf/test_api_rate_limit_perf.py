import time
from requests import Session
from concurrent.futures import ThreadPoolExecutor, as_completed
from statistics import mean

TEST_DURATION = 30  # seconds
CONCURRENCY = 20


# TODO: Implement a Python performance test that sends concurrent requests to this API (use provided imports)
# TODO: Detect and handle 429 responses gracefully using retry strategies
# TODO: Create log file with recorded metrics
def test_users_api_rate_limit_baseline(session: Session, api_base_url: str):
    """
    Fires requests as fast as possible using concurrency.
    Expected to trigger API rate limiting.
    """

    # helper method
    def call_api(session):
        start = time.time()
        response = session.get(f"{api_base_url}/users")
        latency = time.time() - start

        return response.status_code, latency, response.headers

    results = []

    assert len(results) > 0
