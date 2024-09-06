import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
    declare name: string;
    declare email: string;

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(128),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(128),
                    allowNull: true,
                },
            },
            {
                tableName: "users",
                schema: 'notifyQueue',
                timestamps: true,
                sequelize,
            }
        );
    }
}

export default UserModel;