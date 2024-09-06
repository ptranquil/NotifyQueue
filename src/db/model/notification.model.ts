import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface NotificationLogAttributes {
    id: number;
    userId: string;
    orderId: string;
    oldStatus: string;
    newStatus: string;
}

type NotificationLogCreationAttributes = Optional<NotificationLogAttributes, "id">;

class NotificationLogModel extends Model<NotificationLogAttributes, NotificationLogCreationAttributes> {
    declare id: number;
    declare userId: number;
    declare orderId: number;
    declare oldStatus: string;
    declare newStatus: string;

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                orderId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                oldStatus: {
                    type: DataTypes.ENUM(
                        "created",
                        "order-pickup",
                        "out-for-delivery",
                        "delivered",
                        "cancelled"
                    ),
                    allowNull: false,
                },
                newStatus: {
                    type: DataTypes.ENUM(
                        "created",
                        "order-pickup",
                        "out-for-delivery",
                        "delivered",
                        "cancelled"
                    ),
                    allowNull: false,
                },
            },
            {
                tableName: "NotificationLog",
                schema: "notifyQueue",
                timestamps: true,
                sequelize,
            }
        );
    }
}

export default NotificationLogModel;
