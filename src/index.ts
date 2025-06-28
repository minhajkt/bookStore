import express, { Request, Response } from "express";
import { connectDB } from "./config/db.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/env.config";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import purchaseRoutes from "./routes/purchase.routes";
import revenueRoutes from "./routes/revenue.routes";
import './jobs/dailyDigest.job'
import './jobs/monthlyDigest.job'

const app = express();

connectDB();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = config.port || 3000;

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/revenue", revenueRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
