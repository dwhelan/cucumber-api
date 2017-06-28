Feature: Should handle JSON data types

  Scenario: Should parse JSON data types
    When I add
      | true | false | integer | float | null | object     | array    |
      | true | false | 123     | 1.23  | null | { "a": 1 } | [ 1, 2 ] |
    Then the request should be
      """
      {
        "true": true,
        "false": false,
        "integer": 123,
        "float": 1.23,
        "null": null,
        "object": { "a": 1 },
        "array": [ 1, 2 ]
      }
      """
