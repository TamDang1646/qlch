import React from 'react';

import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CarouselImage from '../../components/CarouselImage';
import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import productServices from '../../services/ProductServices';
import { getMoneyFormat } from '../../utils/Utils';

interface Props {
    route: any
}
const ProductDetailScreen = (props: Props) => {
    console.log(props);
    const [data, setData] = React.useState();
    const { item } = props.route.params;
    console.log(item);
    React.useEffect(() => {
        setData(item)
    }, [item])

    const renderItem = ({ item, index }: any) => {
        return item && <TouchableOpacity
            onPress={() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                // setImageIndex(index);
                // setVisible(true)
            }}
            style={{ flex: 1, alignSelf: 'center' }} >
            <Image source={{ uri: item }} style={{ width: 380, height: 240 }} resizeMode={'cover'} />
        </TouchableOpacity>
    }
    const callBack = (dt: any) => {
        setData(dt)
    }
    const onPressEdit = () => {
        NavigationService.navigate(routes.PRODUCT_EDIT, { item: data, callBack: (dt: any) => callBack(dt) })
    }
    const deleteProduct = async () => {
        const res = productServices.deleteProduct(item?.id)
        if (!(await res).errorCode) {
            showMessage({
                message: 'Delete succes!',
                type: 'success',
                icon: 'success',
                autoHide: true
            })
            NavigationService.back()
        } else {
            showMessage({
                message: (await res).errorMsg,
                type: 'danger',
                icon: 'danger',
                autoHide: true
            })
            NavigationService.back()
        }
    }
    const onDelete = () => {
        Alert.alert(
            'Xóa sản phẩm',
            'Bạn có chắc chắn xóa sản phầm này?',
            [
                {
                    text: 'Huỷ',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                { text: 'Đồng ý', onPress: deleteProduct }
            ]
        );
    }
    const renderSave = () => {
        return <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
            onPress={onDelete}
        >
            <FontAwesomeIcon icon={faTrashCan} size={20} color='black' />
        </TouchableOpacity>

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderView title='Sản phẩm' renderRight={() => renderSave()} />
            <ScrollView style={{ flex: 1, margin: verticalScale(16) }}>
                <TextBase title={data?.name} style={{
                    fontSize: verticalScale(16),
                    fontWeight: '700',
                    width: '70%',
                    // flex:1
                }} />
                <View style={{ marginVertical: verticalScale(16) }}>
                    {data?.image && data?.image?.length > 0 ?
                        <CarouselImage data={data?.image?.split(',')} renderItem={renderItem} viewCount={item?.image?.length} />
                        : <Image
                            source={images.defaultImage}
                            style={{
                                width: verticalScale(300),
                                height: verticalScale(250),
                                marginVertical: verticalScale(16),
                                alignSelf: 'center',
                            }}
                        />
                    }
                </View>
                <TextBase title={`Size: ${data?.size}`} style={{
                    fontSize: verticalScale(16),
                    marginBottom: verticalScale(10)
                    // flex:1
                }} />
                <TextBase title={`Giá thuê: ${getMoneyFormat(data?.price)} VND`} style={{
                    fontSize: verticalScale(16),
                    marginBottom: verticalScale(10)
                    // flex:1
                }} />
                <TextBase title={`Số lượng có: ${data?.quantity}`} style={{
                    fontSize: verticalScale(16),
                    marginBottom: verticalScale(10)
                    // flex:1
                }} />
            </ScrollView>
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

export default ProductDetailScreen