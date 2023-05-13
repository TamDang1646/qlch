import React from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    faPhone,
    faTruckFast,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import HeaderView from '../../components/HeaderView';
import InputBase from '../../components/InputBase';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { images } from '../../constants/images';
import { customer } from '../../mockData/customer';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import { removeVietnameseTones } from '../../utils/Utils';

const CustomerScreen = () => {
    const [data, setData] = React.useState<any>([])
    React.useEffect(() => {
        setData(customer)
    }, [])

    const renderCustom = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => { NavigationService.navigate(routes.CUSTOMER_VIEW, { item }) }}
                style={[styles.billsItem, { backgroundColor: '#BEFFBD' }]}>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faUser} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`${item.name}`} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faPhone} style={styles.itemLableIcon} color='green' />
                    <TextBase title={item.phoneNumber} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faTruckFast} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`Địa chỉ: ${item.address}`} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderView title='Khách hàng' />
            <InputBase
                // titleInput={this.state.jobTypeChosen.length >= 3 ? "Bạn đã chọn tối đa 3 ngành nghề cho phép" : 'Chọn tối đa 3 ngành nghề'}
                // titleInputStyle={{ marginLeft: 0, fontWeight: '400', color: this.state.jobTypeChosen.length >= 3 ? R.colors.warningColor : R.colors.textColor }}
                style={{ alignSelf: 'center', width: R.DEVICE_WIDTH - verticalScale(30), marginTop: verticalScale(10), marginBottom: verticalScale(20), borderWidth: 1, borderRadius: 10, borderColor: colors.borderColor }}
                initValue={''}
                onFocus={() => { }}
                placeholder={'Tìm kiếm khách hàng'}
                placeholderColor={colors.greyColor}
                type={'NORMAL'}
                onChangeText={txt => {
                    const newDataFillter = customer.filter((item: { name: any; address: any; addressDetail: any; label: any; }) => {
                        const itemData = removeVietnameseTones(item.name || item.address || item.addressDetail || item.label).toUpperCase();
                        const textData = removeVietnameseTones(txt).toUpperCase();
                        return itemData.indexOf(textData) > -1;
                    }) || [];
                    console.log('new search', newDataFillter);
                    setData(newDataFillter)
                }}
                iconRight={images.icon_search}
                iconRightStyle={{ width: verticalScale(25), height: verticalScale(25) }}
                contentStyle={{ backgroundColor: colors.borderGreyColor }}
                borderColor={colors.borderGreyColor}
            />
            <FlatList
                data={data}
                keyExtractor={(item: any) => `item-${item.id}`}
                renderItem={renderCustom}
            // isRefresh={isRefresh}
            >
            </FlatList>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
export default CustomerScreen