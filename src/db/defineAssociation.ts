import { UserModel } from "./dbConnection";
import NotificationLogModel from "./model/notification.model";
import OrderModel from "./model/orders.model";

/**
 * This file is responsible to defining all the assiciation between the tables
 */
export const defineAssociations = () => {
    // A user can have multiple orders, so userId in OrderModel will be a foreign key.
    UserModel.hasMany(OrderModel, {
        foreignKey: "userId",
    });

    // Each Order will belong to a specific user via userId.
    OrderModel.belongsTo(UserModel, {
        foreignKey: "userId",
    });

    // A user can have multiple notification logs, so userId in NotificationLogModel will be a foreign key.
    UserModel.hasMany(NotificationLogModel, {
        foreignKey: "userId",
    });

    // An order can have multiple notification logs, so orderId will be a foreign key in NotificationLogModel.
    OrderModel.hasMany(NotificationLogModel, {
        foreignKey: "orderId",
    });

    // Each NotificationLog entry will belong to a specific user via userId.
    NotificationLogModel.belongsTo(UserModel, {
        foreignKey: "userId",
    });

    //  Each NotificationLog entry will belong to a specific order via orderId.
    NotificationLogModel.belongsTo(OrderModel, {
        foreignKey: "orderId",
    });
};
