/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    faAdd,
    faFilter,
    faTruckFast,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { bills } from '../../mockData/bills';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import { converTimeStamp } from '../../utils/Utils';
import BillsComponentView from '../ComponentCustom/BillsComponentView';

interface Props {
    navigation: any
}
const BillScreen = (props: Props) => {
    const onClose = () => {
        console.log('close');
        R.Alert.close();
    }
    const onPressEdit = (item:any) => {
        onClose?.()
        NavigationService.navigate(routes.BILL_CREATE_EDIT_SCREEN,{bill:item,type:'edit'})
    }
    const onPressBill = (item: any) => {
        R.Alert.alert({
            renderContent: () => <BillsComponentView item={item} onClose={onClose} />,
        })
    }
    const renderBills = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressBill(item)}
                style={[styles.billsItem, { backgroundColor: item.expire ? item.paid ? '#C8FFA6' : '#FFD9D9' : styles.billsItem.backgroundColor }]}>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faUser} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`${item?.customer?.name} - ${item?.customer?.phoneNumber}`} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faTruckFast} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`Địa chỉ: ${item?.address}`} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faTruckFast} style={styles.itemLableIcon} color='green' />
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

    const renderBillsToday = () => {
        return <View style={{ paddingVertical: verticalScale(16) }}>
            <View style={{
                margin: verticalScale(16),
                marginTop: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faFilter} size={20} style={{ marginRight: 4 }} color='#A8A8A8' />
                    <TextBase title={'Filter'} style={{
                        fontSize: verticalScale(18),
                        color: '#A8A8A8'
                    }}
                        onPress={() => {
                            console.log('sê moẻ');
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faAdd} size={20} style={{ marginRight: 4 }} color='#A8A8A8' />

                    <TextBase title={'Tạo hoá đơn mới'}
                        onPress={() => {
                            console.log('sê moẻ');
                        }}
                        style={{
                            fontSize: verticalScale(18),
                            // fontStyle: 'italic',
                            borderBottomWidth: 1,
                            color: '#A8A8A8'
                        }} />
                </View>
            </View>
            <FlatList
                data={bills}
                keyExtractor={(item: any) => `item-${item.id}`}
                renderItem={renderBills}
            // isRefresh={isRefresh}
            >
            </FlatList>
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBillsToday()}
        </SafeAreaView>
    );
}
export default BillScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    menu: {
        width: verticalScale(50),
        height: verticalScale(50),
        overflow: 'hidden',
        margin: verticalScale(16)
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
    }
})
// ... other code from the previous section