import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class UserServive extends ApiHelper {
    getUserById = async (id: String) => {
        console.log('code', id);

        const response = await this.callApi(Configuration.API_URL + `/customer/${id}`, {}, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    createUser = async (data: any) => {
        const response = await this.callApi(Configuration.API_URL + '/customer', data, 'POST', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    updateUserInfo = async (id: number, userInfo: any) => {
        const response = await this.callApi(Configuration.API_URL + `/customer/${id}`, userInfo, 'PATCH', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    searchUser = async (dt: any) => {
        const response = await this.callApi(Configuration.API_URL + '/customer/all', dt, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }
}
const userService: UserServive = new UserServive();
export default userService;