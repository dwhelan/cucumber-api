# cucumber-api

This repo provides a common set of steps and configuration for testing apis with cucumber.js.

# Add cucumber-api to your project

Add `cucumber-api` to your `package.json` file as a development dependency.

```
yarn add cucumber-api --dev
```

# License
UNLICENSED

# Roadmap
* requests
  * consider using type from JSON schema for JSON conversion rather than inference
* responses
  * enforce correct data types in responses
  * consider using type from JSON schema for JSON conversion rather than inference
  * configure use of 'data' as top-level key for valid responses (JSONAPI)
  * configure use of 'error' as top-level key for error responses (JSONAPI)
* execution
  * disable logging when running with 'app'
* options
  * configure camel case conversion etc for field names

# Known Issues
- To be added
