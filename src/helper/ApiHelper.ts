import queryString from 'query-string';
import { Platform } from 'react-native';
import { RNFetchBlob } from 'rn-fetch-blob';

// import "react-native-get-random-values";
import Configuration from '../config/Configuration';
import { User } from '../entities/User';
import Emitter from './Emitter';
import localStorage from './LocalStorage';

// import { motelString } from "../constants";

class ApiHelper extends Emitter {
  userId = 0;
  code = '';
  graphqlCall = (graphQLParams: any) => {
    return fetch(Configuration.API_URL + '/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  callApi = async (endpoint: string, data: any, method = 'GET', contentType = 'application/json', authenticated = true) => {
    let userId = await this.getUserId()
    let code = await this.getUserCode()
    const config: any = {
      method: method,
      headers: {},
    }
    // console.log("deviceInfo", appVersion, buildNumber, DeviceConfig.getBuildIdSync(), DeviceConfig.getDeviceType())
    // data.userId = userId
    let url = '';
    config.headers['x-user-code'] = code;
    config.headers['x-user-id'] = userId;
    if (method == 'GET') {
      data = { ...data, platform: Platform.OS }
      url = data ? (endpoint + (endpoint.includes('?') ? '&' : '?') + queryString.stringify(data, { arrayFormat: 'none' })) : endpoint;
    } else {
      url = endpoint
      config.headers['Content-Type'] = contentType
      switch (contentType) {
        case 'application/x-www-form-urlencoded':
          data = { ...data, platform: Platform.OS }
          config.body = queryString.stringify(data)
          break;
        case 'application/json':
          data = { ...data, platform: Platform.OS }
          config.body = JSON.stringify(data)
          break;
        default:
          config.body = data;
          break;
      }
    }

    try {
      console.log('Requesting ', url, config);
      let response = await fetch(url, config);
      const data = await this._handleResponse(response, url, config, 0, authenticated, method);
      return data
    } catch (e: any) {
      console.log('Error:', e)
      return { errorCode: 501, message: 'Network request fail: ' + url };
    }
  }

  _handleResponse = async (response: any, url: string, config: any, retries = 0, authenticated = true, method = 'GET'): Promise<any> => {
    if (response.status == 401 && authenticated && retries < 3) {
      try {

        const isjson = (response.headers.map['content-type']?.includes('application/json'))
        const _response = isjson ? await response.json() : { errorCode: 502, message: await response.text() };
        return _response;
      }
      catch (e: any) {
        console.log('response Error:', response, e)
        // globalApp.customLog.emitEvent({
        //   type: 'call_api_response',
        //   payload: `${method}_RES:: ${url}${JSON.stringify({ errorCode: 501, message: e.message })}\nTIME_RES:: ${formatTimeNow()}`
        // });
        return { errorCode: 501, message: e.message };
      }
    }
    else if (response.status == 504) {
      //timeout
      // globalApp.customLog.emitEvent({
      //   type: 'call_api_response',
      //   payload: `${method}_RES:: ${url}${JSON.stringify({ errorCode: 504, message: 'Request timed out! Please try again.' })}\nTIME_RES:: ${formatTimeNow()}`
      // });
      return { errorCode: 504, message: 'Request timed out! Please try again.' + url }
    }
    else if (response.status >= 400) {
      const isjson = (response.headers.map['content-type']?.includes('application/json'))
      let data = isjson ? await response.json() : { errorCode: 502, message: await response.text() };
      this.emit('api_error', data);
      if (!data.errorCode) {
        data.errorCode = response.status
      }
      // globalApp.customLog.emitEvent({
      //   type: 'call_api_response',
      //   payload: `${method}_RES:: ${url}${JSON.stringify(data)}\nTIME_RES:: ${formatTimeNow()}`
      // });
      return data
    }
    else {
      const isjson = (response.headers.map['content-type']?.includes('application/json'))
      const _response = response.headers.map['content-length'] > 0 ? (isjson ? await response.json() : { errorCode: 502, message: await response.text() }) : {};
      // globalApp.customLog.emitEvent({
      //   type: 'call_api_response',
      //   payload: `${method}_RES:: ${url}${JSON.stringify(_response)}\nTIME_RES:: ${formatTimeNow()}`
      // });
      return _response;
    }
  }

  logout = async () => {
    console.log('logout remove saved data.');
    await localStorage.removeItem('motel_userId');
    await localStorage.removeItem('motel_code');
    // await localStorage.removeItem('motel_refreshToken');
    // await localStorage.removeItem('motel_firebaseToken');
    // await localStorage.removeItem('motel_mqttToken');
    // await localStorage.removeItem('motel_chatToken');
    // await localStorage.removeItem('motel_userCode');
    // await localStorage.removeItem('motel_userFullName');
    // await localStorage.removeItem('motel_userAvatar');
    // this.token = '';
    // this.refresh_token = '';
    // this.firebaseToken = '';
    // this.mqttToken = '';
    return;
  }

  saveLoginTokenInfo = async (user: User) => {

    if (user && user.id) {
      await localStorage.setItem('motel_userId', user.id.toString());
      this.userId = user.id;
    }
    if (user && user.code) {
      await localStorage.setItem('motel_code', user.code);
      this.code = user.code;
    }
  }


  getUserId = async () => {
    const userId: string = await localStorage.getItem('motel_userId');

    if (userId) {
      this.userId = parseInt(userId);
      return parseInt(userId)
    } else {
      this.userId = 0;
      return 0
    }
  }
  getUserCode = async () => {
    const code: string = await localStorage.getItem('motel_code');
    console.log('code', code);
    if (code) {
      this.code = code;
      return code
    } else {
      this.code = '';
      return '0'
    }
  }
  uploadFile = async (images: any, type = 'image/jpeg') => {
    console.log('image2222', images);

    const data = new FormData();
    const config: any = {
      method: 'POST',
      headers: {
        // key: Configuration.UPLOADE_IMAGE_API_KEY
      }
    }
    data.append('key', Configuration.UPLOADE_IMAGE_API_KEY)
    data.append('media', {
      name: images.filename || images.path.split('/').reverse()[0],
      type: images.type || type,
      uri: Platform.OS === 'ios' ?
        images.path.replace('file://', '')
        : images.path,
    })
    config.body = data
    config.headers['Content-Type'] = 'multipart/form-data'
    const url = Configuration.UPLOAD_IMAGES_URL;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then(data => data).catch(e => console.log('error', e))
    // const response = await this.callApi(url, data,'POST','multipart/form-data',true)
    return response;
  }
  uploadFile2 = async (path: string, name: string, type = 'image/jpeg') => {

    const formData = [];
    formData.push({
      name: 'photo',
      filename: name,
      data: RNFetchBlob.wrap(path)
    });
    console.log('formData', formData);

    let response = await RNFetchBlob.fetch(
      'POST',
      Configuration.UPLOAD_IMAGES_URL + '?key=' + Configuration.UPLOADE_IMAGE_API_KEY,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      {
        source: formData
      }
    );
    console.log('response', response);

    return response;
  }

}

// const api: ApiHelper = new ApiHelper();

export default ApiHelper;