# Vote4Me Express.js API

<div align="center">
  <img src="https://devlafuente.es/favicon.png" alt="logo Vote4Me" width="200" />
</div>

This API works with **Express.js** and is the API for the application [**Vote4Me**](https://github.com/SamPons12/voteme.com) created with React.

> **Note:** If you don't have access to the Vote4Me repository please contact with you administrator for further information

## Installation

#### Clone the repository:
```bash
git clone https://github.com/SamPons12/api.voteme.com
```

#### Install dependencies
```bash
npm install
```

#### Create and fill .env file
``` bash
APP_NAME=Vote4Me
APP_APP_URL="http://localhost:5173"
APP_API_URL=http://localhost:3000/api  

DB_HOST=localhost
DB_USER=root
DB_PWD=
DB_NAME=voteme

CLOUDINARY_CLOUD_NAME="name"
CLOUDINARY_API_KEY="key"
CLOUDINARY_API_SECRET="my secret"

MAILGUN_API_KEY="key"
MAILGUN_DOMAIN="example.com"
MAILGUN_FROM="Vote4Me <no-reply@example.com>"

CLOUDFLARE_SITEVERIFY_URL="https://challenges.cloudflare.com/turnstile/v0/siteverify"
TURNSTILE_SECRET_KEY="key"

JWT_SECRET="my secret"
```
>**Note:** This .env content it's an example, fill with your data

#### Run!
```bash
npm run dev
```
>**Note:** To change <code>npm run dev</code> behavior, edit **package.json**

## Contact

Email: sam@devlafuente.es
