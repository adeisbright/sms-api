import { DataTypes } from "sequelize";
import { sequelize } from "../../loaders/pg-loader";
import Account from "./account.model";

const PhoneNumber = sequelize.define(
	"phone_number",
	{
		id: {
			type: DataTypes.NUMBER,
            primaryKey : true,
            autoIncrement : true
		},
		account_id: {
			type: DataTypes.NUMBER,
			allowNull : false,
            references : {
                model : Account , 
                key : "id"
            }
		},
		number: {
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

Account.hasMany(PhoneNumber) ; 

export default PhoneNumber;
