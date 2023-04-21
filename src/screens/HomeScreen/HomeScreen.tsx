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
import Modal from 'react-native-modal';

import {
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
import { converTimeStamp } from '../../utils/Utils';
import BillsComponentView from '../ComponentCustom/BillsComponentView';

interface Props {
    navigation: any
}
const HomeScreen = (props: Props) => {
    const { navigation } = props;
    const isDrawerOpen = useDrawerStatus() === 'open';
    const [visible, setVisible] = React.useState(false);
    const [currentItem,setCurrentItem]=React.useState<any>({})
    // const [isRefresh,setIsRefresh] = React.useState(false);
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
    // const renderBillModal = () => {
    //     return (
    //         <View style={{
    //             alignSelf: 'center',
    //             padding: verticalScale(16),
    //             borderWidth: 1,
    //             width: '100%',
    //         }}>
    //             <TouchableOpacity style={{
    //                 position: 'absolute',
    //                 top: 10,
    //                 right:10
    //             }}
    //                 onPress={()=>onClose?.()}
    //             >
    //                 <FontAwesomeIcon icon={faClose} size={30}/>
    //             </TouchableOpacity>
    //             <View style={{
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 marginVertical: verticalScale(20)
    //             }}>
    //                 <Image source={images.img_logo} style={{
    //                     width: verticalScale(50),
    //                     height: verticalScale(50),
    //                     overflow: 'hidden',
    //                     borderRadius: verticalScale(50) / 2
    //                 }} resizeMode='stretch' />
    //                 <TextBase title={'Q-Fashion'} />
    //                 <TextBase title={`${convertFullTimeStamp(currentItem?.createAt)}`} style={{
    //                     fontSize: verticalScale(14),
    //                     color: '#A8A8A8'
    //                 }} />
    //             </View>
    //             <View style={{
    //                 paddingVertical: verticalScale(8),
    //                 borderTopWidth: 1,
    //                 borderBottomWidth: 1,
    //                 borderStyle: 'dashed'
    //             }}>
    //                 <TextBase title={'Khách hàng:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.name} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'SĐT:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.phoneNumber} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.address} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Thời gian thuê:  '} style={styles.customerInfo}>
    //                     <TextBase title={converTimeStamp(currentItem?.startDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
    //                     <TextBase title={' - '} />
    //                     <TextBase title={converTimeStamp(currentItem?.endDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
    //                 </TextBase>
    
    //             </View>
    //             <View style={{
    //                 marginTop: verticalScale(10),
    //             }}>
    //                 <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    //                     <TextBase title={'Tổng hoá đơn:'} />
    //                     <TextBase title={`${currentItem?.totalPrice} đ`} />
    //                 </View>
    //                 <View style={{ padding: verticalScale(4), borderWidth: 1, borderStyle: 'dashed', borderColor: '#D7D3D3' }}>
    //                     <ScrollView style={{ width: '100%', height: verticalScale(100) }}>
    //                         {currentItem?.items?.map((i: any) => {
    //                             return (
    //                                 <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    //                                     <TextBase title={i.name} style={{ flex: 3, color: '#827878' }} numberOfLines={1} ellipsizeMode='tail' />
    //                                     <TextBase title={`x${i.total}`} style={{ flex: 0.5, color: '#827878' }} />
    //                                     <TextBase title={getMoneyFormat(i.price)+' đ'} style={{ flex: 1.5, color: '#827878',textAlign:'right' }} />
    //                                 </View>
    //                             )
    //                         })}
    //                     </ScrollView>
    //                 </View>
    //                 <View style={{marginTop:verticalScale(8)}}>
    //                 <TextBase title={'Tiền cọc:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem.deposit?getMoneyFormat(currentItem.deposit)+' đ':'0 đ'} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Còn lại:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem.deposit?getMoneyFormat(parseFloat(currentItem.totalPrice)-parseFloat(item.deposit))+' đ':getMoneyFormat(item.totalPrice)+' đ'} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 </View>
    //             </View>
    //             <TouchableOpacity style={{
    //                 width:verticalScale(150),
    //                 height: verticalScale(50),
    //                 alignItems: 'center',
    //                 justifyContent:'center',
    //                 borderRadius:20,
    //                 backgroundColor:'#A2FDA0',
    //                 alignSelf: 'center',
    //                 margin:verticalScale(8)
    //             }}
    //                 onPress={onPressEdit}
    //             >
    //                 <TextBase title={'Chỉnh sửa'}/>
    //             </TouchableOpacity>
    //         <View style={{
    //             alignSelf: 'center',
    //             padding: verticalScale(16),
    //             borderWidth: 1,
    //             width: '100%',
    //         }}>
    //             <TouchableOpacity style={{
    //                 position: 'absolute',
    //                 top: 10,
    //                 right:10
    //             }}
    //                 onPress={()=>onClose?.()}
    //             >
    //                 <FontAwesomeIcon icon={faClose} size={30}/>
    //             </TouchableOpacity>
    //             <View style={{
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 marginVertical: verticalScale(20)
    //             }}>
    //                 <Image source={images.img_logo} style={{
    //                     width: verticalScale(50),
    //                     height: verticalScale(50),
    //                     overflow: 'hidden',
    //                     borderRadius: verticalScale(50) / 2
    //                 }} resizeMode='stretch' />
    //                 <TextBase title={'Q-Fashion'} />
    //                 <TextBase title={`${convertFullTimeStamp(currentItem?.createAt)}`} style={{
    //                     fontSize: verticalScale(14),
    //                     color: '#A8A8A8'
    //                 }} />
    //             </View>
    //             <View style={{
    //                 paddingVertical: verticalScale(8),
    //                 borderTopWidth: 1,
    //                 borderBottomWidth: 1,
    //                 borderStyle: 'dashed'
    //             }}>
    //                 <TextBase title={'Khách hàng:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.name} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'SĐT:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.phoneNumber} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Địa chỉ:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem?.customer.address} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Thời gian thuê:  '} style={styles.customerInfo}>
    //                     <TextBase title={converTimeStamp(currentItem?.startDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
    //                     <TextBase title={' - '} />
    //                     <TextBase title={converTimeStamp(currentItem?.endDate)} style={{ fontSize: verticalScale(14), color: '#EB5500' }} />
    //                 </TextBase>
    
    //             </View>
    //             <View style={{
    //                 marginTop: verticalScale(10),
    //             }}>
    //                 <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    //                     <TextBase title={'Tổng hoá đơn:'} />
    //                     <TextBase title={`${currentItem?.totalPrice} đ`} />
    //                 </View>
    //                 <View style={{ padding: verticalScale(4), borderWidth: 1, borderStyle: 'dashed', borderColor: '#D7D3D3' }}>
    //                     <ScrollView style={{ width: '100%', height: verticalScale(100) }}>
    //                         {currentItem.items?.map((i: any) => {
    //                             return (
    //                                 <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    //                                     <TextBase title={i.name} style={{ flex: 3, color: '#827878' }} numberOfLines={1} ellipsizeMode='tail' />
    //                                     <TextBase title={`x${i.total}`} style={{ flex: 0.5, color: '#827878' }} />
    //                                     <TextBase title={getMoneyFormat(i.price)+' đ'} style={{ flex: 1.5, color: '#827878',textAlign:'right' }} />
    //                                 </View>
    //                             )
    //                         })}
    //                     </ScrollView>
    //                 </View>
    //                 <View style={{marginTop:verticalScale(8)}}>
    //                 <TextBase title={'Tiền cọc:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem.deposit?getMoneyFormat(currentItem.deposit)+' đ':'0 đ'} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 <TextBase title={'Còn lại:  '} style={styles.customerInfo}>
    //                     <TextBase title={currentItem.deposit?getMoneyFormat(parseFloat(currentItem.totalPrice)-parseFloat(item.deposit))+' đ':getMoneyFormat(item.totalPrice)+' đ'} style={styles.customerInfo_text} />
    //                 </TextBase>
    //                 </View>
    //             </View>
    //             <TouchableOpacity style={{
    //                 width:verticalScale(150),
    //                 height: verticalScale(50),
    //                 alignItems: 'center',
    //                 justifyContent:'center',
    //                 borderRadius:20,
    //                 backgroundColor:'#A2FDA0',
    //                 alignSelf: 'center',
    //                 margin:verticalScale(8)
    //             }}
    //                 onPress={onPressEdit}
    //             >
    //                 <TextBase title={'Chỉnh sửa'}/>
    //             </TouchableOpacity>
    //         </View>
    //         </View>
        
    //     )
    // }
    const onClose = () => {
        console.log('close');
        setVisible(false)
    }
    // const onPressEdit = (item: any) => {
    //     onClose?.()
    //     NavigationService.navigate(routes.BILL_CREATE_EDIT_SCREEN, { bill: item, type: 'edit' })
    // }
    const onPressBill = async(item: any) => {
        await setCurrentItem(item);
        setVisible(true);
    }
    const renderModal = () => {
        return (
            <Modal
                onBackdropPress={() => setVisible(false)}
                isVisible={visible}
                style={{ margin: 0, justifyContent: 'center' }}
                onBackButtonPress={() => setVisible(false)}
                backdropTransitionOutTiming={0}
                animationIn="slideInUp"
                animationOutTiming={500}
                animationOut="slideOutDown"
            >
                <View style ={{
                    backgroundColor: 'white',
                    alignSelf:'center',
                    width: verticalScale(343)
                }}>
                    <BillsComponentView item={currentItem} onClose={onClose} />
                {/* {renderBillModal()} */}
                </View>
            </Modal >
        )
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
                    <TextBase title={'Nguyen Van A'} style={{
                        fontSize: verticalScale(18),
                        marginHorizontal: verticalScale(8)
                    }} />
                </View>
            </View>
            {renderDashboard()}
            {renderBillsToday()}
            {renderModal()}
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
