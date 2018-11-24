# POST /api/register

Used to register new users. Returns visible user information.

### Headers
Content-Type: application/json
Accept: application/json

### Payload
string name, string email, string password, string password_confirmation

### Response

## Example:

### Request: POST http://192.168.10.52/api/register

Headers: Content-Type: application/json, Accept: application/json

Payload:
{
  "name":"asdf",
  "email":"asdf@asdf.com",
  "password":"sala1234",
  "password_confirmation":"sala1234"
}

### Response:
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

# POST /api/register

Used to register new users. Returns visible user information.

### Headers
Content-Type: application/json
Accept: application/json

### Payload
string name, string email, string password, string password_confirmation

### Response

## Example:

### Request: POST http://192.168.10.52/api/register

Headers: Content-Type: application/json, Accept: application/json

Payload:
{
  "name":"asdf",
  "email":"asdf@asdf.com",
  "password":"sala1234",
  "password_confirmation":"sala1234"
}

### Response:
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
