## Project requirements
- Node Version >= 20
- Installed Docker engine or Docker Descktop

## How to run project (locally)
```bash
# install npm dependencies
npm install 

# copy .env.example to .env
cp .env.example .env

# run docker container
docker compose up -d

# run migrations
npx prisma migrate deploy

# run prisma client generator
npx prisma generate

# run seeders
npx prisma db seed

# run development server
npm run dev
```
