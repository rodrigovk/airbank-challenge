<h1 align="center">
Airbank challenge
</h1>

## Installation

- Clone this repository (`git clone https://https://github.com/rodrigovk/airbank-challenge.git`)
- Create a PostgreSQL local database
- Create a .env file in the root of the folder `server` with a variable of the connection string in this format:
    - `DATABASE_URL="postgres://username:password@localhost:port/database-name"`

- Inside the server folder, execute the following commands on a terminal:
    - `npm install`
    - `npm run migrate`
    - `npm run dev`

- Inside the client folder, execute the following commands on a terminal:
    - `npm install`
    - `npm run dev`