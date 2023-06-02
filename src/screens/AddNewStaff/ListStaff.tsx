import React from 'react';

import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import authServices from '../../services/AuthServices';

const ListStaffScreen = () => {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState<boolean>(false);
    const types = ['Admin', 'Nhân viên'];
    React.useEffect(() => {
        void getAll()
    }, [])
    const getAll = async () => {
        setLoading(true)
        const res = await authServices.getAll()
        if (!res.errorCode) {
            setData(res.data)
        }
        setLoading(false)
    }
    const renderStaff = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => { NavigationService.navigate(routes.ADD_NEW_STAFF_SCREEN, { item: item }) }}
                style={[styles.billsItem, { backgroundColor: '#BEFFBD' }]}>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faPhone} style={styles.itemLableIcon} color='green' />
                    <TextBase title={item.phoneNumber} />
                </View>
                <View style={styles.itemLable}>
                    <FontAwesomeIcon icon={faUser} style={styles.itemLableIcon} color='green' />
                    <TextBase title={`Loại tài khoản: ${types[item.role]}`} style={{ color: '#BA50B2' }} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderView title='Danh sách tài khoản' />
            <FlatList
                data={data}
                keyExtractor={(item: any) => `item-${item.id}`}
                renderItem={renderStaff}
                style={{
                    // alignItems: 'flex-start',
                    margin: verticalScale(16)
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                // isRefresh={isRefresh}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getAll} />
                }
            />
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

export default ListStaffScreen