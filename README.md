# Multi-Tenancy SaaS Application

This project is a multi-tenancy SaaS application built using Express, Prisma, and MongoDB. It is designed for training and practicing MongoDB sharding.

## Idea

The main idea used is to store users for each tenant, with MongoDB handling the sharding for the user collection to ensure scalability and performance.

## Features

- Multi-tenancy architecture
- User and tenant management
- MongoDB sharding

## API Documentation

The API documentation is available [here](https://documenter.getpostman.com/view/37611133/2sAYJ4jM8m).

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/multi-tenancy-saas.git
   cd multi-tenant-saas
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start Prisma and generate the client:

   ```sh
   npx prisma generate
   ```

4. Start the application:
   ```sh
   npm run dev
   ```

## MongoDB Sharding Setup

For detailed instructions on how to set up MongoDB sharding locally, please refer to [this PDF guide](https://drive.google.com/file/d/1dKQTkMUmJlPMOO-tAxC0yylB6pxgYXUn/view?usp=sharing).
