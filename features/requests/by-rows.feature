Feature: Creating a request object by rows of objects

  Scenario: Should use header row for keys
    When I build a request with
      | a  | b  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """

  Scenario: Should use a column with an empty header cell for keys
    When I build a request with
      |     | a  | b  |
      | foo | a1 | b1 |
    Then the request should be
    """
    {
      "foo": {
        "a": "a1",
        "b": "b1"
      }
    }
    """
