import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class UserServive extends ApiHelper {
    getUserByCode = async (code: String) => {
        console.log('code',code);
        
        const response = await this.callApi(Configuration.API_URL+`/user/code/${code}`,{}, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }

    updateUserInfo = async (id:number,userInfo:any) => {
        const response = await this.callApi(Configuration.API_URL+'/user/update',userInfo, 'PATCH', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, userInfo: response };
    }
 }
const userService: UserServive = new UserServive();
export default userService;