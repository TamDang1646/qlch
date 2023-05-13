import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class AuthServices extends ApiHelper {
    login = async (phoneNumber: string, password: string) => {
        const response = await this.callApi(Configuration.API_URL + '/auth/login', { phoneNumber, password }, 'POST', 'application/json', false)
        if (!response?.errorCode) {
            await this.saveLoginTokenInfo(response)
        }
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    register = async (phoneNumber:string,password:string,rePassword:string) => {
        const response = await this.callApi(Configuration.API_URL+'/auth/register', { phoneNumber, password, rePassword }, 'POST', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    updatePassword = async (phoneNumber: string, newPassword: string, rePassword: string) => { 
        const response = await this.callApi(Configuration.API_URL+'/auth/update', { phoneNumber, newPassword, rePassword }, 'PATCH', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, response: response };
    }
 }
const authServices: AuthServices = new AuthServices();
export default authServices;