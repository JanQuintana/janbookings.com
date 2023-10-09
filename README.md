Simple CRUD made with Symfony as backend and ReactJS as frontend.

## Installation

Clone the [repository](https://github.com/JanQuintana/janbookings.com/tree/main).

Rename the file env.example to .env and then execute the following commands.

```bash
# Rename env.example to .env
cd backend
mv env.example .env

# Build the containers
sudo docker-compose build

# Once it's done start the containers
sudo docker-compose up

# Then execute the migrations for creating the tables of the database
sudo docker-compose run backend php bin/console doctrine:migrations:migrate


```
