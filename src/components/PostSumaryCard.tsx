import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import AnimatedLottieView, { default as Lottie } from 'lottie-react-native';
import {
    Animated,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Easing } from 'react-native-reanimated';

import { PostStatus } from '../constants';
import { images } from '../constants/images';
import { Author } from '../entities/Author';
import { Posts } from '../entities/Post';
import postServices from '../services/PostServices';
import { useAppSelector } from '../stores';
import {
    getMoneyFormat,
    getTimeUnit,
} from '../utils/UtilsMoney';
import Icon from './Icon';
import R from './R';
import { verticalScale } from './Scales';
import TextBase from './TextBase';

interface Props {
    data: Posts
    onPress?: () => void;
    setSavePost?: (id: number, status: number) => void;
    id: number,
    author: Author,
    title: string,
    detail: string,
    postTime: string,
    price: number,
    address: string,
    postType: number,
    status: number,
    image: string,
    isSave: number,
}
function PostSumaryCard(props: Props) {
    const { postType, data, id, onPress, setSavePost, author, title, postTime, price, address, status, image, isSave } = props;
    const [save, setSave] = useState<number>(isSave ?? 0);
    const animationProgress = useRef(new Animated.Value(0))
    let animation = React.createRef<AnimatedLottieView>()
    const [imageList, setImagesList] = useState<string[]>([])
    const { userInfo } = useAppSelector(state => state)
    useEffect(() => {
        if (imageList) {
            setImagesList(image?.split(','))
        } else {
            console.log('image', image);

        }
        setSave(isSave);
        Animated.timing(animationProgress.current, {
            toValue: isSave,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [isSave, save])

    const renderDetail = (title: string, icon: any, color = '#000000') => {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: verticalScale(6),
            overflow: 'hidden',
        }}
        >
            <Icon name={icon} size={verticalScale(18)} color={color} />
            <TextBase title={title} style={{ fontSize: verticalScale(16), marginHorizontal: verticalScale(8) }} ellipsizeMode={'tail'} numberOfLines={1} />
        </View>
    }

    const onSavePress = async () => {
        if (save == 0) {
            await postServices.savePost(data.id).then(
                res => {
                    if (!res.errorCode) {
                        setSave(1)
                        Animated.timing(animationProgress.current, {
                            toValue: 1,
                            duration: 1000,
                            easing: Easing.linear,
                            useNativeDriver: false
                        }).start();
                        if (setSavePost) setSavePost(props.id, 1)
                    } else {
                        R.showMessage({
                            message: res.errorMsg,
                            type: 'danger',
                            icon: 'danger',
                            autoHide: true
                        })
                    }
                }
            )
        } else {
            await postServices.deletePost(data.id).then(
                res => {
                    if (!res.errorCode) {

                        setSave(0)
                        Animated.timing(animationProgress.current, {
                            toValue: 0,
                            duration: 500,
                            easing: Easing.linear,
                            useNativeDriver: false
                        }).start();
                        if (setSavePost) setSavePost(id, 0)
                    } else {
                        R.showMessage({
                            message: res.errorMsg,
                            type: 'danger',
                            icon: 'danger',
                            autoHide: true
                        })
                    }
                }
            )
        }
    }
    const renderSave = () => {
        return <TouchableOpacity
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onPress={onSavePress}
            style={{
                width: verticalScale(20),
                height: verticalScale(20),
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: verticalScale(0),
                right: verticalScale(0)
            }}
        >
            <Lottie
                ref={anim => animation = anim}
                // ref={animationProgress?.current}
                source={require('../../assets/lotties/save.json')}
                progress={animationProgress.current}
            //   autoPlay
            //   loop
            />
        </TouchableOpacity>
    }
    console.log('image', image, imageList);

    return (
        <TouchableOpacity key={id} style={styles.posted} onPress={onPress}>
            {status == PostStatus.Hided ?
                <View pointerEvents="none" style={styles.devType}>
                    <TextBase title={'Đã ẩn'} style={styles.titleExpire} />
                </View>
                : null}
            <Image
                source={image ? { uri: imageList?.[0] } : images.defaultImage}
                style={{ width: verticalScale(120), height: verticalScale(120), marginLeft: verticalScale(16), alignSelf: 'center' }}
                resizeMode='stretch'
            />
            <View style={{ flex: 1, margin: verticalScale(16), marginVertical: verticalScale(16), marginBottom: verticalScale(8), }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: verticalScale(8) }}>
                    <Icon name='home' size={verticalScale(18)} color={'#524FFB'} />
                    <TextBase
                        title={title}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                        style={{
                            fontSize: verticalScale(16),
                            fontWeight: 'bold',
                            marginHorizontal: verticalScale(8),
                            marginRight: verticalScale(36)
                        }}
                    />
                </View>
                {renderDetail(author?.name || '', 'account_fill', '#F903CC')}
                {renderDetail(postTime?.slice(0, 10) || '', 'history', '#F9AF03')}
                {
                    postType == 0 ?
                        renderDetail(getMoneyFormat(price.toString() || '') + ' VND' + `/${getTimeUnit(data.timeUnit)}` || '', 'money', '#03F90B')
                        :
                        renderDetail(`${getMoneyFormat(data?.minPrice?.toString())} -> ${getMoneyFormat(data?.maxPrice?.toString())}` || '' + ' VND', 'money', '#03F90B')
                }
                {renderDetail(address || '', 'khoangcachphuhop', '#0695AB')}
                {/* {renderDetail(score?.toString() || '', 'Favorite', '#D9DD06')} */}
                {userInfo.id != data.authorId ? renderSave() : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    posted: {
        // width: verticalScale(364),
        // marginHorizontal: verticalScale(8),
        // height: verticalScale(190),
        borderWidth: 1,
        borderColor: '#E0DFDF',
        marginBottom: verticalScale(16),
        marginHorizontal: verticalScale(16),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: verticalScale(10),
        backgroundColor: '#F9F9EB',
        overflow: 'hidden'
        // paddingTop: verticalScale(16),
    },
    title: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',

    },
    text: {
        fontSize: verticalScale(16),
        marginBottom: verticalScale(2)
    },
    txtnoteText: {
        color: '#E6161A',
        fontSize: verticalScale(11),
        marginLeft: 4,
    },
    expireTime: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        borderWidth: 1
    },
    devType: {
        position: 'absolute',
        bottom: verticalScale(20),
        right: verticalScale(-30),
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        width: verticalScale(120),
        height: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-45deg' }],
        zIndex: 1000,
        elevation: 1000
    },
    titleExpire: {
        color: 'white',
        fontWeight: '600',
        fontFamily: 'Roboto-Bold',
        fontSize: verticalScale(12)
    }
})
export default React.memo(PostSumaryCard);