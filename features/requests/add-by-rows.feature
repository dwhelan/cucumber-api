Feature: Add objects to requests by row

  Scenario: Should use header row for keys
    When I add by rows
      | a  | b  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """
 
  Scenario: "by rows" should be optional
    When I add
      | a  | b  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """

  Scenario: Should support "set"
    When I set
      | a  | b  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "a": "a1",
      "b": "b1"
    }
    """
 
  Scenario: Should support "update"
    When I update
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
    When I add
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

  Scenario: Should allow a variable path in the step
    When I add foo
      | a  | b  |
      | a1 | b1 |
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
    When I add "foo"
      | a  | b  |
      | a1 | b1 |
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
    When I add a "foo"
      | a  | b  |
      | a1 | b1 |
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
    When I add an "oo"
      | a  | b  |
      | a1 | b1 |
    Then the request should be
    """
    {
      "oo": {
        "a": "a1",
        "b": "b1"
      }
    }
    """
