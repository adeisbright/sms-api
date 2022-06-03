import { DataTypes } from "sequelize";
import { sequelize } from "../../loaders/pg-loader";

const Account = sequelize.define(
	"account",
	{
		id: {
			type: DataTypes.NUMBER,
            primaryKey : true,
            autoIncrement : true
		},
		auth_id: {
			type: DataTypes.STRING,
            allowNull : false 
		},
		username: {
			type: DataTypes.STRING,
            allowNull : false 
		}
	},
	{
		timestamps: false,
		freezeTableName: true,
		underscored: true
	}
);

export default Account;
