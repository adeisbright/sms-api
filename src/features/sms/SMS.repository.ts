import IObjectProps from "../../common/props.interface";
import Account from "./account.model";
import PhoneNumber from "./phone-number.model";

class SMSRepository {
	static async getAccount(name: string, authId: string) {
		return await Account.findOne({
			where: {
				username: name,
				auth_id: authId
			}
		});
	}

	static async getPhoneNumber(queryParam: IObjectProps) {
		return await PhoneNumber.findOne({
			where: queryParam
		});
	}
}

export default SMSRepository;
