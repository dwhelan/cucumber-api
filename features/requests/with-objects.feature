Feature: Creating requests from a table of objects

  Scenario: Create request from a table of objects
    When I build a request with
      | A  | B  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """

  Scenario: A blank column should be used as a key for objects
    When I build a request with
      |     | A  | B  |
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

  Scenario: Should be able to mix keys in header row and header column
    When I build a request with
      |         | A.v1  | B.v2 |
      | foo.bar | a1    | b2   |
    Then the request should be
    """
    {
      "foo": {
        "bar": {
          "a": { "v1": "a1" },
          "b": { "v2": "b2" }
        }
      }
    }
    """
