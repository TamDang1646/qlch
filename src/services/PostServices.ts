import Configuration from '../config/Configuration';
import ApiHelper from '../helper/ApiHelper';

class PostServices extends ApiHelper {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  searchPost = async (params: any) => {
    let userId = await this.getUserId()
    let code = await this.getUserCode()
    const data = { ...params, userId, code }
    const response = await this.callApi(Configuration.API_URL + '/post', data, 'GET', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, posteds: response.data };
  }

  savePost = async (postId: number) => {
    let userId = await this.getUserId()
    let code = await this.getUserCode()
    const data = { postId, userId, code }

    const response = await this.callApi(Configuration.API_URL + '/save', data, 'POST', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response };
  }

  deletePost = async (postId: number) => {
    let userId = await this.getUserId()
    let code = await this.getUserCode()
    const data = { postId, userId, code }
    const response = await this.callApi(Configuration.API_URL + '/save' + `/${postId}/${userId}`, {}, 'DELETE', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response };
  }


  getUserSave = async () => {
    let userId = await this.getUserId()
    const response = await this.callApi(Configuration.API_URL + '/post/save-post/' + `${userId}`, {}, 'GET', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, save: response.data };
  }

  createPost = async (param: any) => {

    const response = await this.callApi(Configuration.API_URL + '/post', param, 'POST', 'application/json', false)
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
    const response = await this.callApi(Configuration.API_URL + '/report', params, 'POST', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, report: response };
  }

  updatePost = async (id: number, params: any) => {
    const response = await this.callApi(Configuration.API_URL + '/post/' + id, params, 'PATCH', 'application/json', false)
    let errorMsg = response?.message,
      errorCode = response?.errorCode;
    return { errorCode, errorMsg, report: response };
  }
}
const postServices = new PostServices()
export default postServices;