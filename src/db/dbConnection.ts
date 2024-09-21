import { Sequelize, Dialect } from "sequelize";
import UserModel from "./model/user.model";
import OrderModel from "./model/orders.model";
import NotificationLogModel from "./model/notification.model";

const dbName = process.env.DATABASE_NAME || "";
const dbUser = process.env.DATABASE_USER || "";
const dbPass = process.env.DATABASE_PASSWORD || "";
const dbHost = process.env.DATABASE_HOST || "";
const dbDialect = (process.env.DATABASE_DIALECT as Dialect) || "";

const dbConnection = new Sequelize(dbName, dbUser, dbPass, {
    dialect: dbDialect,
    host: dbHost,
    port: 5432,
    define: {
        timestamps: false,
    },
});

const createDbSchema = async () => {
    try {
        await dbConnection.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DATABASE_SCHEMA};`);
        console.log(`Schema ${process.env.DATABASE_SCHEMA} exists or was created successfully.`);
    } catch (error) {
        console.error("Error creating schema:", error);
    }
};

const dbSync = async () => {
    let models = [UserModel, OrderModel, NotificationLogModel];
    models.forEach((model) => model.initialize(dbConnection));
    dbConnection.sync({ alter: false, force: false,logging: false });
    console.log('DB Synchonization completed!')
}

export { dbConnection, createDbSchema, dbSync };
