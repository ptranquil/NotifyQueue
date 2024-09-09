import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface OrderAttributes {
    id: number;
    userId: string;
    status: string;
}

type OrderCreationAttributes = Optional<OrderAttributes, "id">;

class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> {
    declare id: number;
    declare userId: number;
    declare status: string;

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
                status: {
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
                tableName: "order",
                freezeTableName: true,
                schema: "notifyQueue",
                timestamps: true,
                sequelize,
            }
        );
    }
}

export default OrderModel;
