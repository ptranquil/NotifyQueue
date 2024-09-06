import { Sequelize, Dialect } from "sequelize";

import UserModel from "./model/user.model";
import OrderModel from "./model/orders.model";
import NotificationLogModel from "./model/notification.model";
import { defineAssociations } from "./defineAssociation";

const dbName = process.env.DATABASE_NAME || "";
const dbUser = process.env.DATABASE_USER || "";
const dbPass = process.env.DATABASE_PASSWORD || "";
const dbHost = process.env.DATABASE_HOST || "";
const dbDialect = (process.env.DATABASE_DIALECT as Dialect) || "";

console.log(dbName, dbUser, dbPass, dbHost, dbDialect);

const database = new Sequelize(dbName, dbUser, dbPass, {
    dialect: dbDialect,
    host: dbHost,
    define: {
        timestamps: false,
    },
});

const ensureNotifyQueueSchemaExists = async () => {
    try {
        // Run a raw SQL query to create the schema if it doesn't exist
        await database.query(`
        CREATE SCHEMA IF NOT EXISTS "notifyQueue";
      `);
        console.log("Schema notifyQueue exists or was created successfully.");
    } catch (error) {
        console.error("Error creating schema:", error);
    }
};

// Initialize each model in the database
// This must be done before associations are made
let models = [UserModel, OrderModel, NotificationLogModel];
models.forEach((model) => model.initialize(database));

defineAssociations();

database.sync({
    alter: false,
    force: false,
    logging: false,
});

export {
    database as dbConnection,
    ensureNotifyQueueSchemaExists as createDbSchema,
    UserModel,
};
