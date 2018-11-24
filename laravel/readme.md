# Authentication

## POST /api/register

Registers a new user. Returns visible user information and an initial api_token.

#### Headers
Content-Type: application/json
Accept: application/json

#### Payload
string name, string email, string password, string password_confirmation

### Example

#### Request: POST http://192.168.10.52/api/register

Headers: Content-Type: application/json, Accept: application/json

Payload:
{
  "name":"asdf",
  "email":"asdf@asdf.com",
  "password":"sala1234",
  "password_confirmation":"sala1234"
}

#### Response
201 Created
{
  "data": {
    "name": "asdf",
    "email": "asdf@asdf.com",
    "updated_at": "2018-11-24 16:49:31",
    "created_at": "2018-11-24 16:49:31",
    "id": 3,
    "api_token": "p3IY6f2kwJxEfl5MrRGfhkKnHXr44BZey4YAzXhbZK1G2wvpmrlPVHp30Gg3"
  }
}

## POST /api/login

Logs user in. Returns visible user information and creates a new api_token or overrides an existing one if user hasn't logged out.

#### Headers
Content-Type: application/json, Accept: application/json

#### Payload
string email, string password

### Example

#### Request POST http://192.168.10.52/api/login

Headers: Content-Type: application/json, Accept: application/json

Payload:
{
  "email":"asdf@asdf.com",
  "password":"sala1234",
}

#### Response:
200 OK
{
  "data": {
    "id": 3,
    "name": "asdf",
    "email": "asdf@asdf.com",
    "email_verified_at": null,
    "created_at": "2018-11-24 16:49:31",
    "updated_at": "2018-11-24 17:12:20",
    "api_token": "icK5cgWI4ssi2uEXn62DQ6xa8NwBkSWX9ntN2LJW7pTndShHrquy8JcBcid9"
  }
}

## POST /api/logout

Logs user out and sets the existing api_key to null. Requires api_key.

#### Headers
Authorization: Bearer api_key

#### Payload
None

### Example

#### Request POST http://192.168.10.52/api/logout

Headers: Authorization: Bearer icK5cgWI4ssi2uEXn62DQ6xa8NwBkSWX9ntN2LJW7pTndShHrquy8JcBcid9

#### Response:
200 OK
{
  "message": "User logged out."
}

# Tags

## GET /api/tags

Gets every RuuviTag's information. Requires api_key. Returns an array.

#### Headers
Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer api_key

#### Query Strings
None

### Example

#### Request GET http://192.168.10.52/api/tags

Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer QZHLK22lu0xjhW6qXqJ5F2EVdXOYxC8QTq64uFG47KCdF4QrE9ysO4NTeiN1

#### Response:
200 OK
[
  {
    "RuuviTagId": 212430271652395,
    "User": "Asdf"
  },
    {
    "RuuviTagId": 237954952203111,
    "User": "Qwer"
  },
  
<!-- response is truncated -->

## GET /api/tags

Gets every RuuviTag's information. Requires api_key. Returns an array.

#### Headers
Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer api_key

#### Query Strings
None

### Example

#### Request GET http://192.168.10.52/api/tags

Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer QZHLK22lu0xjhW6qXqJ5F2EVdXOYxC8QTq64uFG47KCdF4QrE9ysO4NTeiN1

#### Response:
200 OK
[
  {
    "RuuviTagId": 212430271652395,
    "User": "Asdf"
  },
    {
    "RuuviTagId": 237954952203111,
    "User": "Qwer"
  },
  
<!-- response is truncated -->

## GET /api/tags/{RuuviTagId}

Gets RuuviTag's information. Requires api_key.

#### Headers
Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer api_key

#### Query Strings
None.

### Example

#### Request GET http://192.168.10.52/api/tags/237954952203111

Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer QZHLK22lu0xjhW6qXqJ5F2EVdXOYxC8QTq64uFG47KCdF4QrE9ysO4NTeiN1

#### Response:
200 OK
{
  "RuuviTagId": 237954952203111,
  "User": "Qwer"
}

## GET /api/tagdata/{RuuviTagId}

Gets RuuviTag's measured data. Requires api_key. Returns an array.

#### Headers
Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer api_key

#### Query Strings
None. 

### Example

#### Request GET http://192.168.10.52/api/tagdata/237954952203111

Headers: Content-Type: application/json, Accept: application/json, Authorization: Bearer QZHLK22lu0xjhW6qXqJ5F2EVdXOYxC8QTq64uFG47KCdF4QrE9ysO4NTeiN1

#### Response:
200 OK
[
  {
    "Count":870,
    "Temp":26,
    "Humidity":33,
    "Pressure":1018,
    "Acceleration-X":2,
    "Acceleration-Y":-23,
    "Acceleration-Z":1059,
    "Power":3019,
    "Time":"2018-11-16 09:42:11",
    "RuuviTagId":237954952203111
  },

<!-- response is truncated -->
