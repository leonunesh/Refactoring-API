# Players REST API — V2

> A modular, Express-based refactor of the original single-file REST API.

---

## From Monolith to Modules

The original V1 was a single `server.js` file doing everything at once — routing, parsing, and business logic all tangled together. It used Node's built-in `http` module, manual URL splitting, and manual body parsing chunk by chunk.

V2 untangles all of that.

```
v2/
├── server.js                      # Entry point & middleware
├── routes/
│   ├── playersRouter.js           # Player routes
│   └── usersRouter.js             # User routes
├── controllers/
│   ├── playersController.js       # Player logic
│   └── usersController.js         # User logic
├── package.json
└── README.md
```

Each layer has one job:

| Layer | Files | Job |
|-------|-------|-----|
| **Server** | `server.js` | Boot, middleware, mount routers |
| **Router** | `routes/*.js` | Which endpoints exist and where they go |
| **Controller** | `controllers/*.js` | What actually happens when they're hit |

---

## Why It's Better

**Separation of concerns** — Routes declare *what* exists. Controllers decide *what happens*. They don't need to know about each other.

**Easier to maintain** — Adding an endpoint means touching a router and a controller, not hunting through one massive file.

**Scales naturally** — `players` and `users` each live in their own router/controller pair. Adding a third resource is just adding two more files.

**Express does the heavy lifting** — `express.json()` replaces manual chunk concatenation. `req.params.id` replaces manual URL splitting. Route definitions are readable at a glance.

---

## API Reference

Both resources follow the same RESTful shape under `/api/v1/`.

### Players — `/api/v1/players`

| Method | Path | What it does |
|--------|------|--------------|
| `GET` | `/` | List all players |
| `POST` | `/` | Create a player |
| `GET` | `/:id` | Fetch one player |
| `PUT` | `/:id` | Update a player |
| `DELETE` | `/:id` | Remove a player |

### Users — `/api/v1/users`

| Method | Path | What it does |
|--------|------|--------------|
| `GET` | `/` | List all users |
| `POST` | `/` | Create a user |
| `GET` | `/:id` | Fetch one user |
| `PUT` | `/:id` | Update a user |
| `DELETE` | `/:id` | Remove a user |

---

## Getting Started

```bash
cd v2
npm install
npm start
```

Server runs at `http://localhost:3000`.

---

## Quick Examples

```bash
# List all players
curl http://localhost:3000/api/v1/players

# Add a new player
curl -X POST http://localhost:3000/api/v1/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Charlie", "team": "Green"}'

# Look up a specific player
curl http://localhost:3000/api/v1/players/1

# Update a player's details
curl -X PUT http://localhost:3000/api/v1/players/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "team": "Yellow"}'

# Remove a player
curl -X DELETE http://localhost:3000/api/v1/players/1
```