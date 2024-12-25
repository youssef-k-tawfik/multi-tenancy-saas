import { prisma } from "../config/database";
import { Request, Response } from "express";

export const getAllTenants = async (_: Request, res: Response) => {
  try {
    console.log("Getting all tenants");
    const tenants = await prisma.tenant.findMany();

    console.log("Tenants retrieved successfully!");

    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({
      message: "Error caught in tenantsController.ts getting all tenants",
    });
  }
};

export const createTenant = async (req: Request, res: Response) => {
  const name = req.body.name;
  const domain = req.body.domain;

  try {
    console.log("Creating tenant with name: ", name);

    console.log("Checking if tenant already exists");
    const existingTenant = await prisma.tenant.findUnique({
      where: { domain },
    });

    if (existingTenant) {
      return res.status(400).json({
        message: "Tenant with this domain already exists",
      });
    }

    console.log("Tenant does not exist");

    const tenant = await prisma.tenant.create({
      data: {
        name,
        domain,
      },
    });

    console.log("Tenant created successfully!");

    res.status(201).json(tenant);
  } catch (error) {
    console.error("Error creating tenant: ", error);
    res.status(500).json({
      message: "Error caught in tenantsController.ts creating a tenant",
    });
  }
};
