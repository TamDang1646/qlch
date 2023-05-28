/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';

import {
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import SelectDropdown from 'react-native-select-dropdown';

import BaseUploadImage from '../../components/BaseUploadImage';
import HeaderView from '../../components/HeaderView';
import Icon from '../../components/Icon';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import productServices from '../../services/ProductServices';

interface Props {
    route: any
}
const ProductEditScreen = (props: Props) => {
    const { item } = props.route.params;
    const [images, setImages] = useState<any>([]);
    const [imagesLocal, setImagesLocal] = useState<any>([]);
    const [name, setName] = React.useState()
    const [size, setSize] = React.useState()
    const [type, setType] = React.useState()
    const [price, setPrice] = React.useState()
    const [quantity, setQuantity] = React.useState()
    const types = ['Quần', 'Áo', 'Giày', 'Phụ kiện']
    const [visibleReport, setVisibleReport] = React.useState<boolean>(false);
    const [currentImage, setCurrentImage] = React.useState<string>();
    React.useEffect(() => {
        if (item?.id) {
            setName(item.name)
            setSize(item.size)
            setType(item.type)
            setPrice(item.price.toString())
            setQuantity(item.quantity.toString())
            setImages(item.image.split(','))
            setImagesLocal(item.image.split(','))
        }
    }, [item])

    console.log(item, images);
    const onPressEdit = async () => {
        const data = {
            name, size, type, price, quantity, image: images.toString()
        }
        console.log(data);
        if (item?.id) {
            const res = await productServices.updateProduct(item.id, data)
            if (!res.errorCode) {
                showMessage({
                    message: 'Upload succes!',
                    type: 'success',
                    icon: 'success',
                    autoHide: true
                })
            } else {
                showMessage({
                    message: res.errorMsg,
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true
                })
            }
        } else {
            const res = await productServices.createProduct(data)
            if (!res.errorCode) {
                showMessage({
                    message: 'Upload succes!',
                    type: 'success',
                    icon: 'success',
                    autoHide: true
                })
                NavigationService.back()
            } else {
                showMessage({
                    message: res.errorMsg,
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true
                })
            }
        }
    }
    const modalOptionImgAvatar = React.createRef()
    const tapImage = (url: string) => {
        setCurrentImage(url);
        setVisibleReport(true)
    }
    console.log('imageState', images, imagesLocal);

    const deleteImage = (i: number) => {
        // console.log('image',images.filter(item=> (images.indexOf(item))!=index),imagesLocal.filter(item=> (imagesLocal.indexOf(item))!=index));
        setImages(images.filter((item: any, index: number) => index != i));
        setImagesLocal(imagesLocal.filter((item: any, index: number) => index != i));

    }
    const renderImage = () => {
        return <Modal
            visible={visibleReport}
            presentationStyle={'overFullScreen'}
            // animationType={animationType}
            onRequestClose={() => setVisibleReport(false)}
            supportedOrientations={['portrait']}
            hardwareAccelerated
            transparent
            animationType='fade'
        // style={{width:R.DEVICE_WIDTH,height:R.DEVICE_HEIGHT,borderWidth:1}}
        >
            <>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <TouchableOpacity
                        style={{
                            width: verticalScale(20),
                            height: verticalScale(20),
                            borderRadius: verticalScale(15),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            zIndex: 10000
                        }}
                        onPress={() => setVisibleReport(false)}>
                        {/* <Icon name='times' size={verticalScale(18)} color={'white'} /> */}
                    </TouchableOpacity>
                    <Image style={{ width: R.DEVICE_WIDTH, height: R.DEVICE_HEIGHT }} source={{ uri: currentImage }} resizeMode='stretch' />
                </View>
            </>

        </Modal>
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <HeaderView title='Chỉnh sửa hàng' />
            <ScrollView style={{ flex: 1, margin: verticalScale(16) }}>
                <TextBase title={'Tên hàng:'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(8)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Nhập tên'
                    placeholderTextColor={colors.grayColor}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                    <TextBase title={'Loại hàng:'} style={{
                        fontSize: verticalScale(18),
                        marginBottom: verticalScale(8),
                        marginRight: verticalScale(16)
                    }} />
                    <SelectDropdown
                        data={types}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setType(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        defaultButtonText='Chọn loại hàng'
                        defaultValue={types[type]}
                    />
                </View>
                <TextBase title={'Size:'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(8)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setSize(text)}
                    value={size}
                    placeholder='Nhập size: Ví dụ 27,28,29,..'
                    placeholderTextColor={colors.grayColor}
                />
                <TextBase title={'Giá thuê:'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(8)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setPrice(text)}
                    value={price}
                    placeholder='Nhập giá'
                    placeholderTextColor={colors.grayColor}
                />
                <TextBase title={'Số lượng hàng:'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(8)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setQuantity(text)}
                    value={quantity}
                    placeholder='Nhập số lượng'
                    placeholderTextColor={colors.grayColor}
                />
                <View>
                    <TextBase title={'Hình ảnh'} style={{
                        fontSize: verticalScale(18),
                        fontWeight: 'bold',
                        marginBottom: verticalScale(8),
                        marginTop: verticalScale(20)
                    }} />
                    <View style={{ marginVertical: verticalScale(0) }}>

                        <TouchableOpacity
                            onPress={() => {
                                modalOptionImgAvatar?.current?.onOpenModal()
                            }}
                            style={{
                                width: verticalScale(110),
                                height: verticalScale(110),
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: verticalScale(16)
                            }}>
                            <Icon name='upload3' size={verticalScale(50)} />
                        </TouchableOpacity>

                        {
                            imagesLocal ?
                                <FlatList
                                    data={imagesLocal}
                                    style={{ marginVertical: verticalScale(8) }}
                                    renderItem={({ item, index }) => item && (
                                        <View style={{
                                            flex: 1 / 3,
                                            flexDirection: 'column',
                                            marginBottom: verticalScale(8),
                                            paddingTop: verticalScale(10)
                                            // borderWidth:1
                                            // marginRight: verticalScale(8),
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: verticalScale(20),
                                                    height: verticalScale(20),
                                                    borderRadius: verticalScale(15),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 1,
                                                    backgroundColor: 'white',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: -10,
                                                    zIndex: 10000
                                                }}
                                                onPress={() => deleteImage(index)}>
                                                <Icon name='times' size={verticalScale(18)} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => tapImage(item)}>
                                                <Image style={styles.imageThumbnail} source={{ uri: item }} resizeMode={'stretch'} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    //Setting the number of column
                                    numColumns={3}
                                    keyExtractor={(item, index) => index}
                                />
                                : < FlatList
                                    data={images}
                                    style={{ marginVertical: verticalScale(8) }}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1 / 3,
                                            flexDirection: 'column',
                                            marginBottom: verticalScale(8),
                                            // marginRight: verticalScale(8),
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: verticalScale(20),
                                                    height: verticalScale(20),
                                                    borderRadius: verticalScale(15),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 1,
                                                    backgroundColor: 'white',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: -10,
                                                    zIndex: 10000
                                                }}
                                                onPress={() => { }}>
                                                <Icon name='times' size={verticalScale(18)} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => tapImage(item)}>
                                                <Image style={styles.imageThumbnail} source={{ uri: item }} resizeMode={'stretch'} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    //Setting the number of column
                                    numColumns={3}
                                    keyExtractor={(item, index) => index}
                                />
                        }
                        {/* {images?< FlatList
                            data={images}
                            style={{ marginVertical: verticalScale(8) }}
                                renderItem={({ item }) => (
                                <View style={{
                                    flex: 1/3,
                                    flexDirection: 'column',
                                    marginBottom: verticalScale(8),
                                    // marginRight: verticalScale(8),
                                }}>
                                    <Image style={styles.imageThumbnail} source={{uri:item}} />
                                </View>
                            )}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => index}
                        />:null
                    } */}

                    </View>
                </View>
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
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={onPressEdit}
            >
                <TextBase title={item?.id ? 'Cập nhật' : 'Thêm mới'} />
            </TouchableOpacity>
            <BaseUploadImage
                ref={modalOptionImgAvatar}
                imgUri={(imgUri: string, imgLocal: string) => {
                    console.log('image', imgUri, imgLocal);
                    setImages([...images, imgUri])
                    setImagesLocal([...imagesLocal, imgLocal])
                }}
                buttonText={'Huỷ bỏ'}
                buttonStyle={{}}
            // multiSelect={true}
            />
            {renderImage()}
        </SafeAreaView>
    )
}

export default ProductEditScreen
const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: 'Pattaya-Regular',
        backgroundColor: 'white',
        marginBottom: verticalScale(20),
        paddingHorizontal: verticalScale(8),
        fontSize: verticalScale(16),
        flexDirection: 'row',
        height: verticalScale(46),
        borderColor: colors.mainGreyColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: verticalScale(8),
    },
    textInput: {
        borderWidth: verticalScale(1),
        borderRadius: verticalScale(10),
        borderColor: colors.inputBorderColor,
        textAlign: 'center',
        fontSize: verticalScale(15),
        fontFamily: 'Roboto',
        color: 'black',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(120),
        // width: verticalScale(110),
        borderRadius: 10,
    },
})