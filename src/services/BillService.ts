import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class BillsServices extends ApiHelper {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    searchBills = async (params: any) => {
        const data = { ...params }
        const response = await this.callApi(Configuration.API_URL + '/bills', data, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, billss: response };
    }

    saveBills = async (billId: number, data: any) => {
        const response = await this.callApi(Configuration.API_URL + '/bills/' + billId, data, 'PATCH', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, save: response };
    }

    deleteBills = async (billsId: number) => {
        const response = await this.callApi(Configuration.API_URL + '/bills' + `/${billsId}`, {}, 'DELETE', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, save: response };
    }

    createBills = async (param: any) => {

        const response = await this.callApi(Configuration.API_URL + '/bills', param, 'POST', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, data: response };
    }

    getiInfo = async () => {
        const response = await this.callApi(Configuration.API_URL + '/bills/info', {}, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, data: response };
    }
    getDetailBill = async (billId: number) => {
        const response = await this.callApi(Configuration.API_URL + '/bills/' + billId, {}, 'GET', 'application/json', false)
        let errorMsg = response?.message,
            errorCode = response?.errorCode;
        return { errorCode, errorMsg, billss: response };
    }
}
const billsServices = new BillsServices()
export default billsServices;