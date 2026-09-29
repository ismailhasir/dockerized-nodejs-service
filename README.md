# dockerized-nodejs-service

A small Express-based Node.js service packaged with Docker. GitHub Actions pushes the image to Docker Hub and deploys it to a remote server automatically.

## Endpoints

| Route | Description |
|-------|-------------|
| `GET /` | Returns `Hello, world!` |
| `GET /secret` | Protected with Basic Auth; returns the secret message for valid credentials, otherwise `401` |

## Environment Variables

Create a `.env` file in the project root:

```env
USERNAME=admin
PASSWORD=password123
SECRET_MESSAGE=Your secret message
```

## Run Locally

```bash
npm install
node app.js
```

## Run with Docker

```bash
docker build -t node-secret-service .
docker run -d --env-file .env -p 3000:3000 --name node-secret-service node-secret-service
```

Test it:

```bash
curl http://localhost:3000/
curl -u admin:password123 http://localhost:3000/secret
```

## CI/CD

Every push to `main` triggers [deploy.yml](.github/workflows/deploy.yml), which:

1. Builds the Docker image and pushes it to Docker Hub
2. Connects to the server over SSH, pulls the new image, and restarts the container

Required GitHub Secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `SERVER_IP`, `SERVER_USER`, `SERVER_SSH_KEY`, `USERNAME`, `PASSWORD`, `SECRET_MESSAGE`.


https://roadmap.sh/projects/dockerized-service-deployment