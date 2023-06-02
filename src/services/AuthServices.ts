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

    register = async (data: any) => {
        const response = await this.callApi(Configuration.API_URL + '/auth/register', data, 'POST', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    getAll = async () => {
        const response = await this.callApi(Configuration.API_URL + '/auth/all', {}, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, data: response };
    }

    updatePassword = async (data: any) => {
        const response = await this.callApi(Configuration.API_URL + '/auth/update', data, 'PATCH', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, response: response };
    }
}
const authServices: AuthServices = new AuthServices();
export default authServices;