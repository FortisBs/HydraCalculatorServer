# Hydra Calculator Server
Server for https://calc.hydraledger.io

## API Documentation

### Models

#### User
```
{
    _id: string;
    username: string;
    password: string;
    roles: Role[];
}
```
Note: in responses the field "password" is excluded.

#### Role
```
{
    _id: string;
    role: string;
}
```

#### Delegate
```
{
    _id: string;
    name: string;
    shareRate: number;
    userId: string;
}
```

### Endpoints

#### Auth
`POST` /auth/registration <br/>
`POST` /auth/login <br/>
`GET` /auth/users <br/>
`GET` /auth/users/:id

#### Delegates
`GET` /delegates/getBy <br/>
`GET` /delegates <br/>
`POST` /delegates <br/>
`PATCH` /delegates <br/>
`DELETE` /delegates/:id

---

#### POST /auth/registration
**Request** <br/>
Pass the following object in body:
```
{
    username: string;
    password: string;
}
```
**Response** <br/>
None

---

#### POST /auth/login
**Request** <br/>
Pass the following object in body:
```
{
    username: string;
    password: string;
}
```
**Response** <br/>
```
{
    token: string;
    user: User;
}
```

---

#### GET /auth/users
**Request** <br/>
Without attachments <br/>
Available only to users with the admin role

**Response** <br/>
`User[]` *Without "password" field

---

#### GET /auth/users/:id
**Request** <br/>
Pass the user's id in parameters <br/>
Example: `/users/someUserId`

**Response** <br/>
`User` *Without "password" field

---

#### GET /delegates/getBy
**Request** <br/>
Pass one of the following query parameter:
* name <br/>
  Example: `/delegates/getBy?name=someDelegate` <br/>
  Response: `Delegate`
* userId <br/>
  Example: `/delegates/getBy?userId=someId` <br/>
  Response: `Delegate[]`

---

#### GET /delegates
**Request** <br/>
Without attachments

**Response** <br/>
`Delegate[]`

---

#### POST /delegates
**Request** <br/>
Pass the following object in body:
```
{
    name: string;
    shareRate: number;
    userId: string;
}
```

**Response** <br/>
`Delegate`

---

#### PATCH /delegates
**Request** <br/>
Pass the following object in body:
```
{
    name: string;
    shareRate: number;
}
```

**Response** <br/>
`Delegate`

---

#### DELETE /delegates/:id
**Request** <br/>
Pass the delegate's id in parameters <br/>
Example: `/delegates/someDelegateId`

**Response** <br/>
None
