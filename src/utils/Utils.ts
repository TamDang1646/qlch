import { Platform } from 'react-native';
import { request } from 'react-native-permissions';

export const converTimeStamp = (timeStamp?: number) => {
  // console.log(timeStamp);

  // convert unix timestamp to milliseconds
  let ts_ms = timeStamp ? timeStamp * 1 : new Date().getTime();

  // initialize new Date object
  let date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  let year = date_ob.getFullYear();

  // month as 2 digits (MM)
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  let date = ('0' + date_ob.getDate()).slice(-2);
  let fullDateTime = date + '/' + month + '/' + year

  return fullDateTime;
}
export const convertFullTimeStamp = (timeStamp: number) => {

  // convert unix timestamp to milliseconds
  // const ts_ms = timeStamp * 1000;
  let ts_ms = timeStamp ? timeStamp * 1 : new Date().getTime();

  // initialize new Date object
  const date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  const year = date_ob.getFullYear();

  // month as 2 digits (MM)
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  const date = ('0' + date_ob.getDate()).slice(-2);
  const hour = ('0' + date_ob.getHours()).slice(-2);
  const minutes = ('0' + date_ob.getMinutes()).slice(-2);

  return hour + ':' + minutes + ' - ' + date + '/' + month + '/' + year
}
export const getMoneyFormat = (str: string, typeMoneyFormat = '100,000.00'): string => {
  return dotMoney(str, typeMoneyFormat);
}
const dotMoney = (str: string, typeMoneyFormat: string): string => {
  try {
    let thousandsSeparator = '';
    let decimalSeparator = '.';

    let temp = String(str).split('.');

    if (typeMoneyFormat == '100.000,00') {
      thousandsSeparator = '.';
      decimalSeparator = ',';
    } else if (typeMoneyFormat == '100,000.00') {
      thousandsSeparator = ',';
      decimalSeparator = '.';
    }

    if (temp.length < 2) {
      return String(str).replace(/[^\d-]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    } else {
      if (temp[1].length > 0) {
        return temp[0].replace(/[^\d-]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) + decimalSeparator + temp[1];
      } else {
        return temp[0].replace(/[^\d-]/g, '').replace(/\B(?=(\\d{3})+(?!\d))/g, thousandsSeparator);
      }
    }

  } catch (error) {
    console.log(error);
    return str;
  }
}

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
  return str;
}
export const getTimeFormat = (day: Date) => {
  const year = day.getFullYear();

  // month as 2 digits (MM)
  const month = ('0' + (day.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  const date = ('0' + day.getDate()).slice(-2);
  return year + '-' + month + '-' + date
}
export async function checkPermission(typeAndroid: any, typeIos: any) {
  // console.log("checkPermission -> typeIos", typeIos)
  const result = await request(Platform.select({
    android: typeAndroid,
    ios: typeIos,
  }));
  // console.log("checkPermission -> result", result)
  return result;
}