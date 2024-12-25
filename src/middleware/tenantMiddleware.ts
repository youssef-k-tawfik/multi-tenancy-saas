import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";

declare global {
  namespace Express {
    interface Request {
      tenantId: string;
    }
  }
}

const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tenantId = req.headers["tenant-id"] as string;
  console.log("tenantMiddleware> tenantId:", tenantId);

  if (!tenantId) {
    console.log("tenantId is missing");
    return res.status(400).json({ error: "Tenant ID is required" });
  }

  try {
    console.log("Checking if tenant exists");
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      console.log("tenant does not exist");
      return res.status(404).json({ error: "Tenant not found" });
    }

    console.log("tenant exists");

    req.tenantId = tenantId;
    next();
  } catch (error) {
    console.error("Error checking tenant tenantMiddleware:", error);
    return res
      .status(500)
      .json({ error: "Internal server error: Couldn't resolve tenant id" });
  }
};

export default tenantMiddleware;
