# nhoca-server
------------------------------------------------------------------------

 [Nhoca](http://nhoca.herokuapp.com) on Heroku.

##  Setting the Local MySQL Instance.
CREATE USER 'nhoca'@'localhost' IDENTIFIED BY 'nhoca';
GRANT ALL PRIVILEGES ON * . * TO 'nhoca'@'localhost';
CREATE DATABASE nhoca_server_db;


Backend of the Nhoca App.
## Services:


*  **GET /ranking**

Returns a list with the top 5 with most score.

**Result:**
```json
{
    "status":200,
    "ranking":[
        {
            "name":"cesar",
            "score":432,
            "createdAt":"2017-02-18T19:15:41.228Z",
            "updatedAt":"2017-02-18T19:15:41.228Z",
            "id":"58a89d5da6f68ebc1fbba352"
        },
        {
            "name":"romario",
            "score":421,
            "createdAt":"2017-02-18T19:16:26.052Z",
            "updatedAt":"2017-02-18T19:16:26.052Z",
            "id":"58a89d8aa6f68ebc1fbba354"
        },
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
