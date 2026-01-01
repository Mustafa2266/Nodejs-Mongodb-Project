# Full-Devops-Project

## Docker

This repository contains a minimal Node.js application and a `Dockerfile` to build a container image.

- Build the Docker image locally:

```bash
docker build -t full-devops-project:latest .
```

- Run the container and map port 3000:

```bash
docker run -p 3000:3000 full-devops-project:latest
```

Then visit `http://localhost:3000` to see the app response.

Files added:

- `server.js` — minimal Node.js HTTP server (listens on port 3000)
- `package.json` — start script
- `Dockerfile` — builds image using `node:20-alpine`
- `.dockerignore` — excludes unnecessary files from build context

## API (Express)

This project now includes a small Express-based REST API for managing in-memory users.

Base URL: `http://localhost:3000`

Endpoints:

- `GET /api/users` — list users
- `POST /api/users` — create user; JSON body `{ "name": "Alice", "email": "a@example.com" }`
- `GET /api/users/:id` — get user by id
- `PUT /api/users/:id` — update user; JSON body with any of `{ "name", "email" }`
- `DELETE /api/users/:id` — delete user

Examples:

Create a user:

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"a@example.com"}' http://localhost:3000/api/users
```

List users:

```bash
curl http://localhost:3000/api/users
```

Notes:

-- To develop locally with live reload, run `npm install` and then `npm run dev` (requires `nodemon`).

GUI:

- A simple single-page GUI is available at `/` and is served from the `public/` directory. It provides a small interface to create, list, edit and delete users.
- Start the server and visit `http://localhost:3000` to use the GUI.

Files added for GUI:

- `public/index.html` — SPA markup
- `public/app.js` — frontend JavaScript that calls the API
- `public/styles.css` — basic styling for the GUI


Persistence:

- The app now persists users in a local SQLite database at `data/users.db` using `better-sqlite3`.
- When running the container, map or mount the `data` directory to keep data across container restarts, for example:

```bash
docker run -p 3000:3000 -v "$PWD/data":/usr/src/app/data full-devops-project:latest
```

CI:

- A GitHub Actions workflow is included at `.github/workflows/ci.yml`. It builds the Docker image and runs smoke tests against the API on push/PR to `main`.



