## Table of Contents

2. [Public Endpoints](#public-endpoints)
   - [GET /api/v1/check](#check)
   - [GET /api/v1/balance/<user>](#balance)
   - [GET /api/v1/about/<user>](#about)
   - [GET /api/v1/banned/<user>](#banned)
   - [GET /api/v1/projects](#projects)
   - [GET /api/v1/project/<project_id>](#project)

# Public Endpoints

Those endpoints do not require autentification of any kind.

## Check

### Request
`GET /api/v1/check`

### Description

Check if the API Server is alive

### Response

```
HTTP/1.1 200

"Ok"
```

## Balance

### Request
`GET /api/v1/balance/<user>`

### Description

Get the balance of a user.

### Response

```
HTTP/1.1 200

{
    "Balance": 0
}
```

## About

### Request
`GET /api/v1/about/<user>`

### Description

Get the 'about me' text of a user.

### Response

```
HTTP/1.1 200

{
    "About": Some about text
}
```
## Banned

### Request
`GET /api/v1/banned/<user>`

### Description

Check if a user is banned.

### Response

```
HTTP/1.1 200

True / False
```

## Projects

### Request
`GET /api/v1/projects/<user>`

### Description

Get a user's Scratch Coins projects.

### Response

```
HTTP/1.1 200

{
    "Projects": {

        "Project Id": ["Project Name", "Server Id"]

    }
}
```

### Exemple

```
HTTP/1.1 200

{
    "Projects": {

        "878004059": ["Sc Core", "80183"]

    }
}
```

### Request
`GET /api/v1/projects?limit=`

### Description

Get a certain number of random scratch coins projects.

### Limit

You can request a maximum of 100 projects per query.

### Response

```
HTTP/1.1 200

{
    "Projects": {

        "Project Id": ["Name":"name", "Author":"author"]

    }
}
```


## Project

### Request
`GET /api/v1/project/<project_id>`

### Description

Get informations about a project.

### Response

```
HTTP/1.1 200

{
    "Name":name,
    "Author":creator
}
```

### Exemple

```
HTTP/1.1 200

{
    "Name":"Sc Core",
    "Author":"Herasium"
}
```


