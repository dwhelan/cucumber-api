Feature: Add objects to requests by columns

  Scenario: Should use header column for keys
    When I add by columns
      | a | a1 |
      | b | b1 |
    Then the request should be
      """
      {
        "a": "a1",
        "b": "b1"
      }
      """

  Scenario: Should use a row with an empty header cell for keys
    When I add by columns
      |   | foo |
      | a | a1  |
      | b | b1  |
    Then the request should be
      """
      {
        "foo": {
          "a": "a1",
          "b": "b1"
        }
      }
      """

  Scenario: Should allow a variable path in the step
    When I add foo by columns
      | a | a1 |
      | b | b1 |
    Then the request should be
      """
      {
        "foo": {
          "a": "a1",
          "b": "b1"
        }
      }
      """

  Scenario: Should allow a "variable path" in the step
    When I add "foo" by columns
      | a | a1 |
      | b | b1 |
    Then the request should be
      """
      {
        "foo": {
          "a": "a1",
          "b": "b1"
        }
      }
      """

  Scenario: Should allow "a" before the path in the step
    When I add a "foo" by columns
      | a | a1 |
      | b | b1 |
    Then the request should be
      """
      {
        "foo": {
          "a": "a1",
          "b": "b1"
        }
      }
      """

  Scenario: Should allow "an" before the path in the step
    When I add an "oo" by columns
      | a | a1 |
      | b | b1 |
    Then the request should be
      """
      {
        "oo": {
          "a": "a1",
          "b": "b1"
        }
      }
      """
