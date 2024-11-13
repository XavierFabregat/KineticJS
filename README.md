# ⚡️ KineticJS ⚡️

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A minimalist and efficient Node.js framework for building web applications with ease. KineticJS provides a simple and flexible API for handling routes, middleware, and static files, making it ideal for developers who want to get up and running quickly without the overhead of larger frameworks.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Creating a Server](#creating-a-server)
  - [Defining Routes](#defining-routes)
  - [Using Middleware](#using-middleware)
  - [Error Handling](#error-handling)
  - [Serving Static Files](#serving-static-files)
- [API Reference](#api-reference)
  - [Kinetic Class](#kinetic-class)
  - [Router Class](#router-class)
  - [Middleware](#middleware)
  - [Error Handling Middleware](#error-handling-middleware)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## Features

- **Fast and Lightweight**: Minimal overhead ensures high performance and quick response times.
- **Easy to Use**: Simple APIs make building web applications straightforward and enjoyable.
- **Middleware Support**: Flexible middleware system allows for powerful extensibility.
- **Routing**: Supports route handling with parameters and different HTTP methods.
- **Static File Serving**: Serve static files out of the box.
- **Error Handling**: Centralized error handling for cleaner code.
- **Modern JavaScript**: Built with modern JavaScript features using ES6+ syntax.

---

## Installation

Install KineticJS via npm:

```bash
npm install kineticjs --save
```

## Getting Started

### Creating a Server

Create a simple server using KineticJS:

```javascript
// server.js
const Kinetic = require('kineticjs');

const app = new Kinetic();

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Defining Routes

Define routes using the get, post, put, and delete methods:

```javascript
// server.js
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.post('/data', (req, res) => {
  res.status(201).json({ message: 'Data received' });
});
```

### Using middleware

Add middleware functions to process requests:

```javascript
// Body parser middleware
const { bodyParser } = require('kineticjs');

const myLogger = async (req, res, next) => {
  /* My Logger Implementation */
};

app.use(bodyParser).use(myLogger);
```

### Error Handling

<!-- Implement centralized error handling:

```js
app.useError((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
``` -->

To be added

### Serving Static Files

Serve static files from a directory:

```js
const path = require('path');
app.use(Kinetic.static(path.join(__dirname, 'public')));
```

## API Reference

### Kinetic Class

#### Methods

- use(middleware): Adds a middleware function.
- use(path, router): Mounts a router on a path.
- get(path, handler): Handles GET requests to a path.
- post(path, handler): Handles POST requests to a path.
- put(path, handler): Handles PUT requests to a path.
- delete(path, handler): Handles DELETE requests to a path.
- useError(handler): Adds an error handling middleware.
- listen(port, callback): Starts the server on the specified port.

## Router Class

### Methods

- use(middleware): Adds middleware to the router.
- get(path, handler): Defines a GET route.
- post(path, handler): Defines a POST route.
- put(path, handler): Defines a PUT route.
- delete(path, handler): Defines a DELETE route.

## Middleware

Middleware functions have the signature:

```js
function name(req, res, next) {
  /* ... */
}
```

- req: The request object.
- res: The response object.
- next: A function to call the next middleware.

## Error Handling Middleware

To be added.

# Examples

## Full Example

```js
import path from 'path';
import Kinetic, { Router, bodyParser, staticFiles } from '../dist';

const app = new Kinetic();
const router = new Router();
router.get('/', (req, res) => {
  res.status(200);
  res.end('Hello from router \n');
});

router.post('/', (req, res) => {
  const { hello } = req.body;
  res.status(200);
  const message =
    hello === 'hi' ? 'Hello to you too! :D' : 'Its nice to say hello :(';
  res.end(`${message} \n`);
});

router.get('/fail', (_, res) => {
  res.status(500);
  res.end('Server Error');
});

app
  .use(bodyParser)
  .use(staticFiles(path.join(__dirname, 'public')))
  .use('/', router)
  .listen(4444, () => console.log('running'));
```

## Accessing Static Files

Place your static files in the public directory relative to your server file:

```arduino
project/
├── server.js
└── public/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

Access them via:

- / for index.html.
- /css/styles.css for CSS files.
- /js/app.js for JavaScript files.

# Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository on GitHub.

2. Clone your fork locally:

```bash
git clone https://github.com/your-username/kineticjs.git
```

3. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

4. Commit your changes with clear messages:

```bash
git commit -m "Add new feature"
```

5. Push to your fork:

```bash
git push origin feature-name
```

6. Create a Pull Request on the main repository.

# License

This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements

Inspired by the simplicity and flexibility of frameworks like Express.js.

# Contact

For any questions or suggestions, please open an issue on GitHub or reach out via email at xavi.fabregat.pous@gmail.com.
