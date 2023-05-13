import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import { converTimeStamp } from '../../utils/Utils';

interface Props {
    route: any;
}
export const CustomerViewScreen = (props: Props) => {
    const { item } = props.route.params;
    console.log('item', item);
    const onPressEdit = () => {
        NavigationService.navigate(routes.CUSTOMER_EDIT, { item })
    }
    return (
        <SafeAreaView>
            <HeaderView title='Khách hàng' />
            <View style={{
                paddingVertical: verticalScale(8),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                margin: verticalScale(16)
            }}>
                <TextBase title={'Khách hàng:  '} style={styles.customerInfo}>
                    <TextBase title={item?.name} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'SĐT:  '} style={styles.customerInfo}>
                    <TextBase title={item?.phoneNumber} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
                    <TextBase title={item?.address} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Thời gian thuê:  '} style={styles.customerInfo}>
                    <TextBase title={converTimeStamp(item?.startDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                    <TextBase title={' - '} />
                    <TextBase title={converTimeStamp(item?.endDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
                </TextBase>

            </View>
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
        </SafeAreaView>
    )
}
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