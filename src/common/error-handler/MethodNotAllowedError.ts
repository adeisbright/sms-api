import constant from "../../constant";
import BaseError from "./BaserError";

class MethodNotAllowedError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
        this.name = constant.errorName.methodNotAllowed;
        this.statusCode = constant.statusCode.METHOD_NOT_ALLOWED;
        this.message = msg;
    }
}

export default MethodNotAllowedError
