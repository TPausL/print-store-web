# PrintStore

Scan 3D-printed products in order to keep track of the stock in a digital twin of the storage shelf.

## This repo

This repository contains the code for showing the digital twin off the storage and do some basic manipulation like removing products or editing colors.

## Notes for setup

1. Run the following command to install the dependencies:

   ```shell
   npm install
   ```

2. Copy .env.example to .env and fill in DSN (SHADOW_DSN is just needed in some migration cases not for normal operation)

3. Run

   ```shell
   npx prisma migrate
   ```

   to setup the database

4. either run
   ```shell
   npm run dev
   ```
   for development server or
   ```shell
   npm run build
   node build
   ```
   to start a production server
