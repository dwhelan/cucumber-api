Feature: Creating request objects from a table of hashes

  Scenario: Create request from a table of hashes
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

  Scenario: A blank column should be used as a key for values in the row
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
