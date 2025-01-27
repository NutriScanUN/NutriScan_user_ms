# NutriScan_store_ms

## Commands to Docker Compile and Run

To build and run the Docker container, use the following commands:

```js
docker build -t nutriscanun-user-ms .
docker run -d -p 3001:3001 --env-file .env --name nutriscanun-user-ms-docker nutriscanun-user-ms
```
Image Deploy

```js
docker tag nutriscanun-user-ms juanxo074/nutriscan-user-ms:latest
```
