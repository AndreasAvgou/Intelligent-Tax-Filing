from fastapi.testclient import TestClient
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

client = TestClient(app)

def test_health_check():
    """Επιβεβαιώνει ότι το API είναι online"""
    response = client.get("/")
    assert response.status_code in [200, 404]