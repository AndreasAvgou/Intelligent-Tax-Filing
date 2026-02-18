import pytest
from fastapi.testclient import TestClient
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

client = TestClient(app)

@pytest.mark.parametrize("gross, sector, kids, married, expected_status", [
    (1200, "private", 0, False, 200),
    (2500, "public", 2, True, 200),
    (5000, "private", 1, False, 200),
])
def test_calculation_logic(gross, sector, kids, married, expected_status):
    payload = {
        "gross_salary": gross,
        "sector": sector,
        "children": kids,
        "is_married": married,
        "lang": "el"
    }
    response = client.post("/api/calculate", json=payload)
    assert response.status_code == expected_status
    if expected_status == 200:
        assert response.json()["monthly_net"] > 0