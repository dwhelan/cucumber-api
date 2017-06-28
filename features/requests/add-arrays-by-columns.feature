Feature: Add arrays to requests by columns

  Scenario: Should use header row for indexes
    When I add a foo array by columns
      | 0 | a1 |
      | 1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should support "set"
    When I set a foo array by columns
      | 0 | a1 |
      | 1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should support "update"
    When I update a foo array by columns
      | 0 | a1 |
      | 1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should use a column with an empty header cell for keys
    When I add arrays by columns
      |   | foo | bar |
      | 0 | a1  | a2  |
      | 1 | b1  | b2  |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ],
        "bar": [ "a2", "b2" ]
      }
      """

  Scenario: Should support sparse arrays
    When I add a foo array by columns
      | 0 | a1 |
      | 2 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", null, "b1" ]
      }
      """
      