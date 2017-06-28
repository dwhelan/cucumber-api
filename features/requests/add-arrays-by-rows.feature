Feature: Add arrays to rquests by rows

  Scenario: Should use header row for indexes
    When I addx an array foo by rows
      | 0  | 1  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "foo": [ "a1", "b1"]
    }
    """
 