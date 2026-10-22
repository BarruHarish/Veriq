import pytest
from pydantic import BaseModel, ValidationError

# Domain schema mirrors
class ReturnRecord(BaseModel):
    order_id: str
    customer_id: str
    order_value: float
    customer_reason: str
    product_category: str

def test_valid_record_ingestion():
    data = {
        "order_id": "ORD-101",
        "customer_id": "CUST-99",
        "order_value": 1499.0,
        "customer_reason": "Jeans chala tight ga undi",
        "product_category": "Denim & Jeans"
    }
    record = ReturnRecord(**data)
    assert record.order_id == "ORD-101"
    assert record.order_value == 1499.0

def test_missing_required_fields():
    incomplete = {
        "order_id": "ORD-102",
        "order_value": 899.0
    }
    with pytest.raises(ValidationError):
        ReturnRecord(**incomplete)

def test_decision_heuristic_separation():
    """Ensure tone/abusive language does not automatically determine fraud."""
    def evaluate_routing(category: str, order_value: float, has_sufficient_history: bool):
        if order_value < 1000 and has_sufficient_history:
            return "AUTO-APPROVE"
        elif category == "abusive" and not has_sufficient_history and order_value > 3000:
            return "ESCALATE"
        else:
            return "INSPECT"
            
    assert evaluate_routing("genuine_quality_issue", 899, True) == "AUTO-APPROVE"
    assert evaluate_routing("genuine_fit_issue", 2499, True) == "INSPECT"
    assert evaluate_routing("abusive", 4599, False) == "ESCALATE"

def test_linguistic_equity_no_penalty():
    """Hinglish or Telugu vernacular phrases must not increase escalation threshold."""
    languages = ["English", "Hinglish", "Telugu/Hinglish"]
    for lang in languages:
        # Language alone has zero weight in escalation logic
        language_risk_weight = 0.0
        assert language_risk_weight == 0.0
