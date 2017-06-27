Feature: Creating a request object by columns of objects

  Scenario: Should use header column for keys
    When I build a request with columns
      | A | a1 |
      | B | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """

  Scenario: Should use a row with an empty header cell for keys
    When I build a request with columns
      |   | foo |
      | A | a1  |
      | B | b1  |
    Then the request should be
    """
    {
      "foo": {
        "a": "a1",
        "b": "b1"
      }
    }
    """
