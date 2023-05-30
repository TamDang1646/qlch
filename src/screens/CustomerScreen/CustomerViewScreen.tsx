import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {
    faMoneyBill,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import HeaderView from '../../components/HeaderView';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { bills } from '../../mockData/bills';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import userService from '../../services/UserService';
import { converTimeStamp } from '../../utils/Utils';

interface Props {
    route: any;
}
export const CustomerViewScreen = (props: Props) => {
    const { item } = props.route.params;
    const [customer, setCustomer] = React.useState();
    console.log('item', item);
    React.useEffect(() => {
        setCustomer(item)
        void getCustomer()
    }, [item])
    const getCustomer = async () => {
        R.Loading.show()
        const res = await userService.getUserById(item?.id);
        if (!res.errorCode) {
            setCustomer(res.userInfo)
        }
        R.Loading.hide()

    }
    const onPressEdit = () => {
        NavigationService.navigate(routes.CUSTOMER_EDIT, { item: customer, callback: (dt: any) => callBack(dt) })
    }
    const callBack = (dt: any) => {
        setCustomer(dt)
    }
    const onPressBill = (item: any) => {
        NavigationService.navigate(routes.BILLS_VIEW, { item })
    }
    const renderBills = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressBill(item)}
                style={[styles.billsItem, { backgroundColor: item.expire ? item.paid ? '#C8FFA6' : '#FFD9D9' : styles.billsItem.backgroundColor }]}>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faMoneyBill} style={styles.itemLableIcon} color='green' />
                    <TextBase title={'Tổng hoá đơn:  '}>
                        <TextBase title={item?.totalPrice} style={{ fontSize: verticalScale(20), color: '#EB5500' }} />
                    </TextBase>
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faTruckFast} style={styles.itemLableIcon} color='green' />
                    <TextBase title={'Thời gian thuê:  '}>
                        <TextBase title={converTimeStamp(item?.startDate)} style={{ fontSize: verticalScale(18), color: '#EB5500' }} />
                        <TextBase title={' - '} />
                        <TextBase title={converTimeStamp(item?.endDate)} style={{ fontSize: verticalScale(18), color: '#EB5500' }} />
                    </TextBase>
                </View>
                {item.expire && !item.paid ? <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#FFBDBD',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: verticalScale(120),
                        height: 40,
                        right: -40,
                        top: 20,
                        transform: [{ rotate: '45deg' }]
                    }}
                >
                    <TextBase title={'Chưa thanh toán'} style={{
                        fontSize: verticalScale(10),
                        color: 'red'
                    }} />
                </View> : null}
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderView title='Khách hàng' />
            <View style={{
                paddingVertical: verticalScale(8),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                margin: verticalScale(16),

            }}>
                <TextBase title={'Khách hàng:  '} style={styles.customerInfo}>
                    <TextBase title={customer?.name} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'SĐT:  '} style={styles.customerInfo}>
                    <TextBase title={customer?.phoneNumber} style={styles.customerInfo_text} />
                </TextBase>
                <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
                    <TextBase title={customer?.address} style={styles.customerInfo_text} />
                </TextBase>
            </View>
            <View style={{
                flex: 1
            }}>
                <TextBase title={'Đơn đã thuê:'} style={{
                    fontSize: verticalScale(18),
                    margin: verticalScale(16)
                }} />
                <FlatList
                    data={bills}
                    keyExtractor={(item: any) => `item-${item.id}`}
                    renderItem={renderBills}
                // isRefresh={isRefresh}
                >
                </FlatList>
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
    bills: {
        marginHorizontal: verticalScale(16),
        flex: 1,
        // borderWidth: 1
    },
    billsItem: {
        // borderWidth: 1,
        marginHorizontal: verticalScale(16),
        marginVertical: verticalScale(8),
        // height: verticalScale(200),
        borderRadius: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
        backgroundColor: '#F2CEFE',
        padding: verticalScale(16),
        overflow: 'hidden'
    },
    itemLable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: verticalScale(2)
    },
    itemLableIcon: {
        marginRight: verticalScale(8)
    },
    timePicker: {
        height: verticalScale(50),
        borderWidth: verticalScale(1),
        marginHorizontal: verticalScale(8),
        marginLeft: 0,
        marginBottom: verticalScale(16),
        borderRadius: verticalScale(8),
        borderColor: colors.inputBorderColor,
        backgroundColor: 'white'
    },
    time: {
        margin: verticalScale(16),
        marginHorizontal: verticalScale(24)
    },
})