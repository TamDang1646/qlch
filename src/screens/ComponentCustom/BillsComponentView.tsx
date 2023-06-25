/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';

import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import HeaderView from '../../components/HeaderView';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import billsServices from '../../services/BillService';
import {
    convertFullTimeStamp,
    getMoneyFormat,
} from '../../utils/Utils';

interface Props {
    onClose?: () => void;
    route: any
}
const BillsComponentView = (props: Props) => {
    const { item } = props.route.params;
    const [data, setData] = React.useState();
    const onPressEdit = () => {
        props?.onClose?.()
        NavigationService.navigate(routes.BILL_CREATE_EDIT_SCREEN, { bill: data, type: 'edit', callBack: () => getDetailBill() })
    }
    React.useEffect(() => {
        void getDetailBill()

    }, [])
    const getDetailBill = async () => {
        R.Loading.show()
        const res = await billsServices.getDetailBill(item?.id);
        if (!res.errorCode) {
            setData(res.billss)
        }
        R.Loading.hide()

    }
    console.log('item', item, props);
    const onPressAccept = async () => {
        let dt = {
            ...data,
            paid: 1,
            deposit: parseFloat(data?.totalPrice)
        }
        const res = await billsServices.saveBills(data?.id, dt);
        if (!res.errorCode) {
            showMessage({
                message: 'Sửa hóa đơn thành công!',
                type: 'success',
                icon: 'success',
                autoHide: true
            })
            void getDetailBill()
            props.route.params?.callBack?.()
        } else {
            showMessage({
                message: res.errorMsg,
                type: 'danger',
                icon: 'danger',
                autoHide: true
            })
        }

    }
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <HeaderView title='Hoá đơn' />
            <View style={{
                flex: 1,
                margin: verticalScale(16)
            }}>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: verticalScale(16)
                    }}>
                    <Image source={images.img_logo} style={{
                        width: verticalScale(50),
                        height: verticalScale(50),
                        overflow: 'hidden',
                        borderRadius: verticalScale(50) / 2
                    }} resizeMode='stretch' />
                    <TextBase title={'Q-Fashion'} />
                    <TextBase title={`${convertFullTimeStamp(data?.createAt)}`} style={{
                        fontSize: verticalScale(14),
                        color: '#A8A8A8'
                    }} />
                </View>
                <View style={{
                    paddingVertical: verticalScale(8),
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed'
                }}>
                    <TextBase title={'Khách hàng:  '} style={styles.customerInfo}>
                        <TextBase title={data?.customerName} style={styles.customerInfo_text} />
                    </TextBase>
                    <TextBase title={'SĐT:  '} style={styles.customerInfo}>
                        <TextBase title={data?.customerPhonenumber} style={styles.customerInfo_text} />
                    </TextBase>
                    <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
                        <TextBase title={data?.address} style={styles.customerInfo_text} />
                    </TextBase>
                    <TextBase title={'Thời gian thuê:  '} style={styles.customerInfo}>
                        <TextBase title={data?.start?.slice(0, 10)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                        <TextBase title={' - '} />
                        <TextBase title={data?.end?.slice(0, 10)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                    </TextBase>

                </View>
                <View style={{
                    marginTop: verticalScale(10),
                }}>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <TextBase title={'Tổng hoá đơn:'} />
                        <TextBase title={`${data?.totalPrice} đ`} />
                    </View>
                    <View style={{ padding: verticalScale(4), borderWidth: 1, borderStyle: 'dashed', borderColor: '#D7D3D3' }}>
                        <ScrollView style={{ width: '100%', height: verticalScale(100) }}>
                            {data?.items?.map((i: any, index: number) => {
                                return (
                                    <View key={`data-bill-${i.id}-${index}`} style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                        <TextBase title={i.name} style={{ flex: 3, color: '#827878' }} numberOfLines={1} ellipsizeMode='tail' />
                                        <TextBase title={`x${i.quantity}`} style={{ flex: 0.5, color: '#827878' }} />
                                        <TextBase title={getMoneyFormat(i.price) + ' đ'} style={{ flex: 1.5, color: '#827878', textAlign: 'right' }} />
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: verticalScale(8) }}>
                        <TextBase title={'Đã thanh toán:  '} style={styles.customerInfo}>
                            <TextBase title={data?.deposit ? getMoneyFormat(data?.deposit) + ' đ' : '0 đ'} style={styles.customerInfo_text} />
                        </TextBase>
                        <TextBase title={'Còn lại:  '} style={styles.customerInfo}>
                            <TextBase title={data?.deposit ? getMoneyFormat(parseFloat(data?.totalPrice) - parseFloat(data?.deposit)) + ' đ' : getMoneyFormat(data?.totalPrice) + ' đ'} style={styles.customerInfo_text} />
                        </TextBase>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>

                <TouchableOpacity style={{
                    width: verticalScale(150),
                    height: verticalScale(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: '#A2FDA0',
                    alignSelf: 'center',
                    margin: verticalScale(8)
                }}
                    onPress={onPressEdit}
                >
                    <TextBase title={'Chỉnh sửa'} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: verticalScale(150),
                    height: verticalScale(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: data?.paid == 0 ? '#A2FDA0' : colors.grayColor,
                    alignSelf: 'center',
                    margin: verticalScale(8),
                }}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onPress={onPressAccept}
                    disabled={data?.paid == 0 ? false : true}
                >
                    <TextBase title={'Xác nhận thanh toán'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default BillsComponentView
const styles = StyleSheet.create({
    customerInfo: {
        fontSize: verticalScale(13),
        color: '#8AA8A8',
    },
    customerInfo_text: {
        fontSize: verticalScale(15),
        color: '#584747'
    },
})