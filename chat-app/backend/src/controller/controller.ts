import { Response } from "express";
import * as core from "express-serve-static-core";

export const initController = (app: core.Express) => {
  app.get("/health", (req: any, res: Response) => {
    console.log("Enter health");
    res.json({ status: "healthy" });
  });
};
