console.log("server entry point");

// load dotenv if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const http = require("http");
const app = require("./src/app");
const server = http.createServer(app);

// setup server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`)
);
