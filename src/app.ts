console.log("starting app");

import express from "express";
import morgan from "morgan";
import tenantMiddleware from "./middleware/tenantMiddleware";

const app = express();
const tenantRoutes = require("./routes/tenantsRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.use("/tenant", tenantRoutes);
app.use("/user", tenantMiddleware, userRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

const handleErrors = (err: any, _: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

app.use(handleErrors);

module.exports = app;
