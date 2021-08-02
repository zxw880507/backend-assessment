# backend-assessment 

This project was written in `approximately 22 hours` to:

1. set up a basic API with Javascript - `Node + Express`
2. `Jest` as Test Suite to verify the API working properly

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.<br>
Call (http://localhost:3000) followed by two routes to fetch data in the browser.

|   Routes   | Method |        Response body        |
| :--------: | :----: | :-------------------------: |
| /api/ping  |  get   |       success message       |
| /api/posts |  get   | sorted data / error message |

### `npm test`

Launches the test runner in the interactive watch mode.
<br>
<br>

## Routes

- Route 1

  - Route: /api/ping
  - Method: GET
  - Response:
    - Status code: 200
    - Body:
    ```javascript
    {"success": true}
    ```

- Route 2

  - Route: /api/posts
  - Method: GET
  - Query Params:
    Field | Description | Default | Example
    :------------: | :-------------: | :-------------: | :-------------:
    tags | list of tags separated by comma | N/A | /api/posts?tags=tech,history
    sortBy | acceptable values including: id/reads/likes/polularity | id | /api/posts?tags=tech,history&sortBy=likes
    direction | acceptable values including: asc/desc | asc | /api/posts?tags=tech,history&sortBy=likes&direction=desc

  - Response:

    - data fetched successfully:

      ```javascript
          { "posts": [{
          "id": 1,
          "author": "Rylee Paul",
          "authorId": 9,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [ "tech", "health" ] },
          ...
           ]}
      ```

    - data fetched failed status code 400:

      ```javascript
        {
          "error": "Tags parameter is required"
        }
      ```

      OR

      ```javascript
        {
          "error": "sortBy parameter is invalid"
        }
      ```

<br>

## Additional Feature

- Use Cache API to reduce the frequency of calling other servers

- Integration test to cover 90% functionality
