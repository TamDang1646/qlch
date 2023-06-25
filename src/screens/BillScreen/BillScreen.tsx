/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react';

import {
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';

import {
    faAdd,
    faClock,
    faFilter,
    faMoneyBill,
    faTruckFast,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import BaseButton from '../../components/BaseButton';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import billsServices from '../../services/BillService';
import {
    converTimeStamp,
    getMoneyFormat,
} from '../../utils/Utils';

interface Props {
    navigation: any
}
const BillScreen = (props: Props) => {
    const [visibleFilter, setVisibleFilter] = React.useState(false)
    const [startDate, setStartDate] = React.useState(new Date().getTime());
    const [endDate, setEndDate] = React.useState(new Date().getTime());
    const [bills, setBills] = React.useState([])
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        void getBills({})
    }, [])
    const getBills = async (param: any) => {
        setLoading(true)
        const res = await billsServices.searchBills(param);
        if (!res.errorCode) {
            setBills(res.billss)
        }
        setLoading(false)
    }
    const onPressBill = (item: any) => {
        NavigationService.navigate(routes.BILLS_VIEW, { item })
    }
    const renderBills = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressBill(item)}
                style={[styles.billsItem, { backgroundColor: item.paid ? '#C8FFA6' : item.expire ? '#FFD9D9' : styles.billsItem.backgroundColor }]}>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faUser} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`${item?.customerName} - ${item?.customerPhonenumber}`} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faTruckFast} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`Địa chỉ: ${item?.address}`} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faMoneyBill} style={styles.itemLableIcon} color='green' />
                    <TextBase title={'Tổng hoá đơn:  '}>
                        <TextBase title={getMoneyFormat(item?.totalPrice) + ' VND'} style={{ fontSize: verticalScale(20), color: '#EB5500' }} />
                    </TextBase>
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faClock} style={styles.itemLableIcon} color='green' />
                    <TextBase title={'Thời gian thuê:  '}>
                        <TextBase title={item?.start?.slice(0, 10)} style={{ fontSize: verticalScale(18), color: '#EB5500' }} />
                        <TextBase title={' - '} />
                        <TextBase title={item?.end?.slice(0, 10)} style={{ fontSize: verticalScale(18), color: '#EB5500' }} />
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

    const setStartDay = () => {
        DateTimePickerAndroid.open({
            value: new Date(startDate),
            onChange: (_, selectedDate) => {
                setStartDate(selectedDate?.getTime())
            },
            mode: 'date',
            is24Hour: true,
        });
    };
    const setEndDay = () => {
        DateTimePickerAndroid.open({
            value: new Date(endDate),
            onChange: (_, selectedDate) => {
                setEndDate(selectedDate?.getTime())
            },
            mode: 'date',
            is24Hour: true,
        });
    };
    const onSelectTime = (index: number) => {
        switch (index) {
            case 0:
                setStartDay()
                break;
            case 1:
                setEndDay()
                break;
            default:
                break;
        }
    }
    const onNextPress = () => {
        const data = {
            start: startDate,
            end: endDate
        }
        console.log('data', data);
        setVisibleFilter(false)

        void getBills(data)
    }
    const arrangeModal = () => {
        return (
            <Modal
                onBackdropPress={() => setVisibleFilter(false)}
                isVisible={visibleFilter}
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    alignSelf: 'center',
                    margin: 0,
                }}
                onBackButtonPress={() => setVisibleFilter(false)}
                backdropTransitionOutTiming={0}
                animationIn="slideInUp"
                animationOutTiming={500}
                animationOut="slideOutDown"
            >
                <View
                    style={{
                        width: '100%',
                        backgroundColor: colors.containerBg,
                        borderTopLeftRadius: verticalScale(20),
                        borderTopRightRadius: verticalScale(20),
                        height: verticalScale(326),
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#F5F5F8',
                            width: '100%',
                            height: verticalScale(50),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTopLeftRadius: verticalScale(20),
                            borderTopRightRadius: verticalScale(20),

                        }}
                    >

                        <TouchableOpacity
                            onPress={() => {
                                setVisibleFilter(false)
                            }}
                            style={{
                                width: verticalScale(50),
                                height: verticalScale(50),
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 0,
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: colors.greyColor,
                                    width: verticalScale(18),
                                    height: verticalScale(18),
                                }}
                                source={images.icon_close}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: verticalScale(10),
                            width: '100%',
                            backgroundColor: colors.containerBg,
                        }}
                    >
                        <View style={{ justifyContent: 'space-between', marginTop: verticalScale(20), marginBottom: verticalScale(16), marginHorizontal: verticalScale(16) }}>
                            <TouchableOpacity
                                style={{ ...styles.timePicker, marginLeft: 0 }}
                                onPress={() => onSelectTime(0)}
                            >
                                <TextBase title={'Thuê từ ngày'} style={{ position: 'absolute', top: -15, left: 7, flexDirection: 'row' }} />

                                {startDate
                                    ? <TextBase title={converTimeStamp(startDate)} style={styles.time} />
                                    : <TextBase title={'DD/MM/YYYY'} style={[styles.time, { color: colors.inputBorderColor }]} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.timePicker, marginRight: 0 }}
                                onPress={() => onSelectTime(1)}
                            >
                                <TextBase title={'Đến ngày'} style={{ position: 'absolute', top: -15, left: 7, flexDirection: 'row' }} />
                                {endDate
                                    ? <TextBase title={converTimeStamp(endDate)} style={styles.time} />
                                    : <TextBase title={'DD/MM/YYYY'} style={[styles.time, { color: colors.inputBorderColor }]} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <BaseButton title={'Sắp xếp'} style={{
                        width: verticalScale(150),
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: verticalScale(10)
                    }}
                        onPress={onNextPress}
                    />
                </View>
            </Modal>
        );
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
                    <TouchableOpacity
                        onPress={() => {
                            setVisibleFilter(true)
                        }}
                    >
                        <TextBase title={'Tìm kiếm'} style={{
                            fontSize: verticalScale(18),
                            color: '#A8A8A8'
                        }}

                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faAdd} size={20} style={{ marginRight: 4 }} color='#A8A8A8' />

                    <TextBase title={'Tạo hoá đơn mới'}
                        onPress={() => {
                            NavigationService.navigate(routes.BILL_CREATE_EDIT_SCREEN, { type: 'add' })
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
                refreshControl={
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <RefreshControl refreshing={loading} onRefresh={getBills} />
                }
                ListEmptyComponent={() => <TextBase title={'Chưa có hóa đơn nào'} style={{
                    fontSize: verticalScale(16),
                    alignSelf: 'center',
                    marginVertical: verticalScale(40),
                    color: colors.grayColor
                }} />}
            >
            </FlatList>
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBillsToday()}
            {arrangeModal()}
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
// ... other code from the previous section