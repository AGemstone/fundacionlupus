import pytest
from main import app
from fastapi.testclient import TestClient
from db.engine import Reflected, TestDBSession, test_engine
from dependencies import get_db

# Modifies test items in place to ensure test classes and functions run in a
# given order.


def pytest_collection_modifyitems(items):
    CLASS_ORDER = [
        "TestPerfil",
        "TestPersona",
    ]

    grouped_tests = {item.cls.__name__: [] for item in items}
    for item in items:
        grouped_tests[item.cls.__name__].append(item)

    # Sort by suffix number
    # Test name should always be /^test_(0|[1-9]+[_0-9]*)$/
    for item in items:
        grouped_tests[item.cls.__name__].sort(key=lambda x: int(x.name[5:]))

    items = []
    for test_class in CLASS_ORDER:
        if grouped_tests.get(test_class) is not None:
            items += grouped_tests[test_class]


def pytest_report_teststatus(report):
    category, short, verbose = '', '', ''
    if report.when in ('setup','teardown'):
        if report.failed:
            category = 'error'
            verbose = 'ERROR'
        # elif report.passed:
        #     category = 'passed'
        #     verbose = 'PASSED'
        elif report.skipped:
            category = 'skipped'
            verbose = 'SKIPPED'
        return (category, short, verbose)
    category = report.outcome
    verbose = category.upper()
    return (category, short, verbose)


def override_get_db():
    try:
        db = TestDBSession()
        yield db
    finally:
        db.close()


client = TestClient(app)
app.dependency_overrides[get_db] = override_get_db

Reflected.prepare(test_engine)
