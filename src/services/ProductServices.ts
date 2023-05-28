import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class ProductServices extends ApiHelper {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  searchProduct = async (params: any) => {
    const data = { ...params }
    const response = await this.callApi(Configuration.API_URL + '/product', data, 'GET', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, products: response };
  }

  saveProduct = async (ProductId: number) => {
    let userId = await this.getUserId()
    let code = await this.getUserCode()
    const data = { ProductId, userId, code }

    const response = await this.callApi(Configuration.API_URL + '/save', data, 'product', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response };
  }

  deleteProduct = async (productId: number) => {
    const response = await this.callApi(Configuration.API_URL + '/product' + `/${productId}`, {}, 'DELETE', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response };
  }


  getUserSave = async () => {
    let userId = await this.getUserId()
    const response = await this.callApi(Configuration.API_URL + '/product/save-product/' + `${userId}`, {}, 'GET', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response.data };
  }

  createProduct = async (param: any) => {

    const response = await this.callApi(Configuration.API_URL + '/product', param, 'POST', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response };
  }

  getReport = async (params: any) => {
    const response = await this.callApi(Configuration.API_URL + '/report', params, 'GET', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, report: response.data };
  }

  createReport = async (params: any) => {
    const response = await this.callApi(Configuration.API_URL + '/report', params, 'Product', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, report: response };
  }

  updateProduct = async (id: number, params: any) => {
    const response = await this.callApi(Configuration.API_URL + '/product/' + id, params, 'PATCH', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, report: response };
  }
}
const productServices = new ProductServices()
export default productServices;