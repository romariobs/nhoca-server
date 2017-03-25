# nhoca-server
------------------------------------------------------------------------

 [Nhoca](http://nhoca.herokuapp.com) on Heroku.

##  Setting the Local MySQL Instance.
CREATE USER 'nhoca'@'localhost' IDENTIFIED BY 'nhoca';
GRANT ALL PRIVILEGES ON * . * TO 'nhoca'@'localhost';
CREATE DATABASE nhoca_server_db;


Backend of the Nhoca App.
## Services:

* *  **GET /player**

```json
{
  "status": 200,
  "players": [
    {
      "uuid": "416a5e20-0f5b-11e7-acf1-d37b2bb40438",
      "name": "eu",
      "bestScore": 0,
      "coins": 1,
      "id": 1,
      "createdAt": "2017-03-22T23:57:07.000Z",
      "updatedAt": "2017-03-22T23:57:07.000Z"
    },
    {
      "uuid": "60c7c710-0f5d-11e7-952c-af9ccb5ec334",
      "name": "tu",
      "bestScore": 0,
      "coins": 0,
      "id": 2,
      "createdAt": "2017-03-23T00:12:18.000Z",
      "updatedAt": "2017-03-23T00:12:18.000Z"
    },
    {
      "uuid": "eb5438f0-0f5d-11e7-9b55-25b0e675ecde",
      "name": "tu",
      "bestScore": 0,
      "coins": 0,
      "id": 3,
      "createdAt": "2017-03-23T00:16:11.000Z",
      "updatedAt": "2017-03-23T00:16:11.000Z"
    }
  ]
}

```

*  **GET /ranking**

Returns a list with the top 10 with most score.

**Result:**
```json
{
  "status": 200,
  "ranking": [
    {
      "name": "Nhocador",
      "score": 24
    },
    {
      "name": "Nhocador",
      "score": 16
    },
    {
      "name": "Nhocador",
      "score": 13
    }
  ]
}

```

* **POST /ranking**

Creates a new ranking passing name and score.

**Body:** _application/json_
```json

{"name": "cesar", "score": 978}

```

**Result:**

```json
{
    "status": 201,
    "ranking": {
        "name": "cesar",
        "score": 978,
        "createdAt": "2017-02-18T20:14:34.725Z",
        "updatedAt": "2017-02-18T20:14:34.725Z",
        "id": "58a8ab2adb8ddf0400eacdb5"
    }
}
```
