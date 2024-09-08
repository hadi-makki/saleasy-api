#!/bin/bash
pm2 stop saleasy-api

git pull

yarn install

yarn build

pm2 start dist/src/main.js --name saleasy-api