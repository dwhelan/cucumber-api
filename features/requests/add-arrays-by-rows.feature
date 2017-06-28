Feature: Add arrays to requests by rows

  Scenario: Should use header row for indexes
    When I add a foo array by rows
      | 0  | 1  |
      | a1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: "by rows" should be optional
    When I add a foo array
      | 0  | 1  |
      | a1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should support "set"
    When I set a foo array
      | 0  | 1  |
      | a1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should support "update"
    When I update a foo array
      | 0  | 1  |
      | a1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ]
      }
      """

  Scenario: Should use a column with an empty header cell for keys
    When I add arrays
      |     | 0  | 1  |
      | foo | a1 | b1 |
      | bar | a2 | b2 |
    Then the request should be
      """
      {
        "foo": [ "a1", "b1" ],
        "bar": [ "a2", "b2" ]
      }
      """

  Scenario: Should support sparse arrays
    When I add a foo array
      | 0  | 2  |
      | a1 | b1 |
    Then the request should be
      """
      {
        "foo": [ "a1", null, "b1" ]
      }
      """