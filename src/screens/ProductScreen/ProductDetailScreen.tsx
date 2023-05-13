import React from 'react';

import {
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';

import CarouselImage from '../../components/CarouselImage';
import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import { getMoneyFormat } from '../../utils/Utils';

interface Props {
    route: any
}
const ProductDetailScreen = (props: Props) => {
    const { item } = props.route.params;
    console.log(item);
    const renderItem = ({ item, index }: any) => {
        return <TouchableOpacity
            onPress={() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                // setImageIndex(index);
                // setVisible(true)
            }}
            style={{ flex: 1, alignSelf: 'center' }} >
            <Image source={{ uri: item }} style={{ width: 380, height: 240 }} resizeMode={'cover'} />
        </TouchableOpacity>
    }
    const onPressEdit = () => {
        NavigationService.navigate(routes.PRODUCT_EDIT, { item })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderView title='Sản phẩm' />
            <ScrollView style={{ flex: 1, margin: verticalScale(16) }}>
                <TextBase title={item.name} style={{
                    fontSize: verticalScale(16),
                    fontWeight: '700',
                    width: '70%',
                    // flex:1
                }} />
                <View style={{ marginVertical: verticalScale(16) }}>
                    {item?.images && item?.images?.length > 0 ?
                        <CarouselImage data={item?.images} renderItem={renderItem} viewCount={item?.images?.length} />
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
                <TextBase title={`Size: ${item.size.join(', ')}`} style={{
                    fontSize: verticalScale(16),
                    marginBottom: verticalScale(10)
                    // flex:1
                }} />
                <TextBase title={`Giá thuê: ${getMoneyFormat(item.price)} VND`} style={{
                    fontSize: verticalScale(16),
                    marginBottom: verticalScale(10)
                    // flex:1
                }} />
                <TextBase title={`Số lượng có: ${item.quantity}`} style={{
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