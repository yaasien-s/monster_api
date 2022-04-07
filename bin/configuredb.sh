#!/bin/bash

database="monstersdb"

echo "Configuring database: $database"

dropdb -U node_user monstersdb
createbd -U node_user monstersdb

psql -U node_user monstersdb < ./bin/sql/monsters.sql

echo "$database configured"