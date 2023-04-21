/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';

import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import {
    convertFullTimeStamp,
    converTimeStamp,
    getMoneyFormat,
} from '../../utils/Utils';

const BillsComponentView = ({ item, onClose }: { item: any, onClose: () => void, }) => {   
    const onPressEdit = () => {
        onClose?.()
        NavigationService.navigate(routes.BILL_CREATE_EDIT_SCREEN, { bill: item, type: 'edit' })
    }
    return (
        <View style={{
            alignSelf: 'center',
            padding: verticalScale(16),
            borderWidth: 1,
            width: '100%',
        }}
            key={`${item.id}-bills`}
        >
            <TouchableOpacity style={{
                position: 'absolute',
                top: 10,
                right:10
            }}
                onPress={()=>onClose?.()}
            >
                <FontAwesomeIcon icon={faClose} size={30}/>
            </TouchableOpacity>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: verticalScale(20)
            }}>
                <Image source={images.img_logo} style={{
                    width: verticalScale(50),
                    height: verticalScale(50),
                    overflow: 'hidden',
                    borderRadius: verticalScale(50) / 2
                }} resizeMode='stretch' />
                <TextBase title={'Q-Fashion'} />
                <TextBase title={`${convertFullTimeStamp(item.createAt)}`} style={{
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
                    <TextBase title={item.customer.name} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'SĐT:  '} style={styles.customerInfo}>
                    <TextBase title={item.customer.phoneNumber} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
                    <TextBase title={item.customer.address} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Thời gian thuê:  '} style={styles.customerInfo}>
                    <TextBase title={converTimeStamp(item?.startDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                    <TextBase title={' - '} />
                    <TextBase title={converTimeStamp(item?.endDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                </TextBase>

            </View>
            <View style={{
                marginTop: verticalScale(10),
            }}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <TextBase title={'Tổng hoá đơn:'} />
                    <TextBase title={`${item.totalPrice} đ`} />
                </View>
                <View style={{ padding: verticalScale(4), borderWidth: 1, borderStyle: 'dashed', borderColor: '#D7D3D3' }}>
                    <ScrollView style={{ width: '100%', height: verticalScale(100) }}>
                        {item.items?.map((i: any) => {
                            return (
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <TextBase title={i.name} style={{ flex: 3, color: '#827878' }} numberOfLines={1} ellipsizeMode='tail' />
                                    <TextBase title={`x${i.quantity}`} style={{ flex: 0.5, color: '#827878' }} />
                                    <TextBase title={getMoneyFormat(i.price)+' đ'} style={{ flex: 1.5, color: '#827878',textAlign:'right' }} />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{marginTop:verticalScale(8)}}>
                <TextBase title={'Tiền cọc:  '} style={styles.customerInfo}>
                    <TextBase title={item.deposit?getMoneyFormat(item.deposit)+' đ':'0 đ'} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Còn lại:  '} style={styles.customerInfo}>
                    <TextBase title={item.deposit?getMoneyFormat(parseFloat(item.totalPrice)-parseFloat(item.deposit))+' đ':getMoneyFormat(item.totalPrice)+' đ'} style={styles.customerInfo_text} />
                </TextBase>
                </View>
            </View>
            <TouchableOpacity style={{
                width:verticalScale(150),
                height: verticalScale(50),
                alignItems: 'center',
                justifyContent:'center',
                borderRadius:20,
                backgroundColor:'#A2FDA0',
                alignSelf: 'center',
                margin:verticalScale(8)
            }}
                onPress={onPressEdit}
            >
                <TextBase title={'Chỉnh sửa'}/>
            </TouchableOpacity>
        </View>
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