import { Request, Response } from "express";
import { prisma } from "../config/database";

declare global {
  namespace Express {
    interface Request {
      tenantId: string;
    }
  }
}

export const getUsersByTenantID = async (req: Request, res: Response) => {
  const tenantId = req.tenantId;

  try {
    console.log(`Getting users by tenant ID ${tenantId}`);

    const users = await prisma.user.findMany({
      where: { tenantId },
    });

    console.log("Users retrieved successfully!");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: `Error caught in usersController.ts getting users by tenant ID ${tenantId}`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const tenantId = req.tenantId;

  try {
    console.log("Creating a new user");

    console.log("Checking if user email already exists");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User email already exists");
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    console.log("User email does not exist");

    const user = await prisma.user.create({
      data: {
        email,
        name,
        tenantId,
      },
    });

    console.log("New user created successfully!");

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error caught in usersController.ts creating a user",
    });
  }
};
