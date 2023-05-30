/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react';

import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    faClock,
    faFileAlt,
    faList,
    faMoneyBill,
    faProcedures,
    faTruckFast,
    faUser,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useDrawerStatus } from '@react-navigation/drawer';

import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { images } from '../../constants/images';
import { bills } from '../../mockData/bills';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import { useAppSelector } from '../../stores';
import { converTimeStamp } from '../../utils/Utils';

interface Props {
    navigation: any
}
const HomeScreen = (props: Props) => {
    const { navigation } = props;
    const isDrawerOpen = useDrawerStatus() === 'open';
    // const [isRefresh,setIsRefresh] = React.useState(false);
    const state = useAppSelector(state => state)
    const onPressMenu = () => {
        if (isDrawerOpen) {
            navigation.closeDrawer();
        } else {
            navigation.openDrawer();
        }
    }
    const renderDashboard = () => {
        return <>
            <View style={styles.dashboard}>
                <View style={styles.rowDash}>
                    <LinearGradient
                        colors={['#F7A1FE', '#F799FF', '#EF75FA']}
                        style={[styles.dash, {}]}>
                        <FontAwesomeIcon icon={faMoneyBill} size={verticalScale(30)} color='#F96868' style={{ marginBottom: verticalScale(8) }} />
                        <TextBase title={'Money'} style={styles.text} />
                        <TextBase title={'25000$'} style={styles.text1} />
                    </LinearGradient>
                    <LinearGradient
                        colors={['#99E7FF', '#89DCFF', '#73E6FF']}
                        style={[styles.dash, {}]}>
                        <FontAwesomeIcon icon={faFileAlt} size={verticalScale(30)} color='#F96868' style={{ marginBottom: verticalScale(8) }} />
                        <TextBase title={'Bills'} style={styles.text} />
                        <TextBase title={'26'} style={styles.text1} />
                    </LinearGradient>
                </View>
                <View style={styles.rowDash}>

                    <LinearGradient
                        colors={['#FEFFB7', '#FDFFA1', '#F6FF92']}
                        style={[styles.dash, {}]}>
                        <FontAwesomeIcon icon={faProcedures} size={verticalScale(30)} color='#F96868' style={{ marginBottom: verticalScale(8) }} />
                        <TextBase title={'Products'} style={styles.text} />
                        <TextBase title={'156'} style={styles.text1} />
                    </LinearGradient>
                    <LinearGradient
                        colors={['#B2FFC8', '#9DFFA7', '#86FF8B']}
                        style={[styles.dash, {}]}>
                        <FontAwesomeIcon icon={faUserFriends} size={verticalScale(30)} color='#F96868' style={{ marginBottom: verticalScale(8) }} />
                        <TextBase title={'Customers'} style={styles.text} />
                        <TextBase title={'30'} style={styles.text1} />
                    </LinearGradient>
                </View>
            </View>
        </>
    }
    const onPressBill = (item: any) => {
        // await setCurrentItem(item);
        // setVisible(true);
        NavigationService.navigate(routes.BILLS_VIEW, { item })
    }
    const renderBills = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                key={`index-${item.id}`}
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
                    <FontAwesomeIcon icon={faMoneyBill} style={styles.itemLableIcon} color='green' />
                    <TextBase title={'Tổng hoá đơn:  '}>
                        <TextBase title={item?.totalPrice} style={{ fontSize: verticalScale(20), color: '#EB5500' }} />
                    </TextBase>
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faClock} style={styles.itemLableIcon} color='green' />
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
        return <>
            <View style={{
                margin: verticalScale(16),
                marginTop: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

                <TextBase title={'Today Bills'} style={{
                    fontSize: verticalScale(20),
                }} />
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate(routes.BILL_SCREEN)
                    }}>

                    <TextBase title={'Xem tất cả'}
                        style={{
                            fontSize: verticalScale(18),
                            // fontStyle: 'italic',
                            borderBottomWidth: 1,
                            color: '#A8A8A8'
                        }} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={bills}
                keyExtractor={(item: any) => `item-${item.id}`}
                renderItem={renderBills}
            // isRefresh={isRefresh}
            >
            </FlatList>
        </>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onPressMenu()}
                    style={styles.menu}>
                    <FontAwesomeIcon icon={faList} size={verticalScale(30)} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={images.img_default_avatar}
                        style={styles.sideMenuProfileIcon}
                    />
                    <TextBase title={state.auth.user?.phoneNumber} style={{
                        fontSize: verticalScale(18),
                        marginHorizontal: verticalScale(8)
                    }} />
                </View>
            </View>
            {renderDashboard()}
            {renderBillsToday()}
            {/* {renderModal()} */}
        </SafeAreaView>
    );
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menu: {
        width: verticalScale(30),
        height: verticalScale(30),
        overflow: 'hidden',
        // margin: verticalScale(16)
    },
    header: {
        flexDirection: 'row',
        padding: verticalScale(16),
        backgroundColor: 'transperent',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sideMenuProfileIcon: {
        resizeMode: 'stretch',
        width: verticalScale(40),
        height: verticalScale(40),
        borderRadius: verticalScale(40) / 2,
        borderColor: 'black',
    },
    dashboard: {
        // borderWidth: 1,
        margin: verticalScale(16)
    },
    dash: {
        width: verticalScale(150),
        height: verticalScale(120),
        margin: verticalScale(16),
        borderRadius: verticalScale(16),
        padding: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    rowDash: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: '#3E2D2D',
        fontSize: verticalScale(18),
        marginVertical: verticalScale(4)
    },
    text1: {
        color: '#3E2D2D',
        fontSize: verticalScale(20),
        marginVertical: verticalScale(4)
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
    customerInfo: {
        fontSize: verticalScale(13),
        color: '#8AA8A8',
    },
    customerInfo_text: {
        fontSize: verticalScale(15),
        color: '#584747'
    },
})
