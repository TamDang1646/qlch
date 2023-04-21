import React, { PureComponent } from 'react';

import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import { colors } from '../constants';
import { images } from '../constants/images';
import { removeVietnameseTones } from '../utils/Utils';
import BaseButton from './BaseButton';
import InputBase from './InputBase';
import R from './R';
import { verticalScale } from './Scales';
import TextBase from './TextBase';

const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height + (StatusBar.currentHeight || 0),
};
interface Props {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface States {
  isOpen: boolean;
  target: {
    x: number;
    y: number;
    opacity: number;
  },
  text: string;
  newData: any[]
}

interface PropsDropdown {
  children?: any,
  touchStyle?: ViewStyle,
  data: any[],
  onSelect: any,
  viewStyle?: ViewStyle,
  title?: string,
  styleTitle?: TextStyle,
  placeholderText?: string,
  titleButton1?: string,
  titleButton2?: string,
  styleButton1?: ViewStyle,
  styleButton2?: ViewStyle,
  viewButton?: ViewStyle
  onButton1Press?: () => void,
  onButton2Press?: () => void,
  imageRightItem?: ImageSourcePropType,
  imageRightItemStyle?: ImageStyle,
}

const {
  Value
} = Animated;

class DropdownListNew extends PureComponent<Props, States> {
  _anim: Animated.Value;
  dataAlert: PropsDropdown | null;

  constructor(props: Props) {
    super(props);

    this.dataAlert = null;
    this._anim = new Value(0);
  }

  state: States = {
    isOpen: this.props.isOpen || false,
    target: {
      x: 0,
      y: 0,
      opacity: 0.6,
    },
    text: '',
    newData: []
  };

  drop = (props: PropsDropdown) => {
    this.dataAlert = {
      title: props.title || '',
      touchStyle: props.touchStyle || { width: '100%', alignSelf: 'center' },
      data: props.data || [],
      onSelect: props.onSelect || undefined,
      viewStyle: props.viewStyle || { width: '100%' },
      styleTitle: props.styleTitle || {},
      placeholderText: props.placeholderText || '',
      titleButton1: props.titleButton1 || '',
      titleButton2: props.titleButton2 || '',
      styleButton1: props.styleButton1 || {},
      styleButton2: props.styleButton2 || {},
      viewButton: props.viewButton || {},
      onButton1Press: props.onButton1Press || undefined,
      onButton2Press: props.onButton2Press || undefined,
      imageRightItem: props.imageRightItem || undefined,
      imageRightItemStyle: props.imageRightItemStyle || {},
    };
    this.setState({
      newData: props.data || []
    })
    this.open();
  }

  open = () => {
    this.setState({
      isOpen: true,
      text: ''
    }, () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      Animated.spring(this._anim, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    });
  }

  close = () => {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      this.setState({
        isOpen: false,
      });
      this.dataAlert = null;
    });
  }

  handleBackButton = () => {
    this.close();
    return true;
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    if (this.props.isOpen !== props.isOpen && props.isOpen) {
      this.open();
    }
  }
  onPressItem = (item: any, index: any) => {
    this.close();
    this.dataAlert?.onSelect?.(index, item);
  }

  renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <TouchableOpacity key={index} onPress={() => { this.onPressItem(item, index) }}
        style={styles.item}
      >
        <TextBase
          title={`${item.tagItem || ''}${item.name || item.address || item.addressDetail || item.label}`}
          numberOfLines={2}
          style={[{
            fontSize: verticalScale(15.5),
            marginLeft: verticalScale(5),
            width: '80%'
          }]} />
        {this.dataAlert?.imageRightItem ? <Image source={this.dataAlert?.imageRightItem} style={{
          width: verticalScale(22),
          height: verticalScale(22),
          resizeMode: 'contain'
        }}></Image> : null}

      </TouchableOpacity>
    )
  }

  handleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.close()
    }
  }

  render() {
    const origin = {
      x: SCREEN.width,
      y: SCREEN.height,
      width: 0,
      height: 0
    };

    const {
      isOpen,
      target,
    } = this.state;

    const lightboxOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp'
      })
    };

    const openStyle = [{
      top: this._anim.interpolate({ inputRange: [0, 1], outputRange: [SCREEN.height, StatusBar.currentHeight || 0], extrapolate: 'clamp' }),
      height: this._anim.interpolate({ inputRange: [0, 1], outputRange: [0, SCREEN.height], extrapolate: 'clamp' }),
    }];

    const _opacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    };

    const content = (
      <Animated.View pointerEvents='box-none' style={[openStyle, _opacityStyle]}>
        <TapGestureHandler onHandlerStateChange={this.handleTap}>
          <Animated.View
            style={{ height: 110 }}
          />
        </TapGestureHandler>
        <View style={[this.dataAlert?.viewStyle, {
          backgroundColor: colors.containerBg,
          borderTopLeftRadius: verticalScale(20), borderTopRightRadius: verticalScale(20),
          flex: 1,
          overflow: 'hidden',
        }]}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#F5F5F8',
            height: verticalScale(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TextBase
              title={this.dataAlert?.title}
              style={[{
                fontSize: verticalScale(18),
                textAlign: 'center',
                color: colors.mainColor
              }, this.dataAlert?.styleTitle]} />

            <TouchableOpacity
              onPress={this.close}
              style={{
                width: verticalScale(50),
                height: verticalScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 0
              }}>
              <Image
                style={{
                  tintColor: colors.greyColor,
                  width: verticalScale(18),
                  height: verticalScale(18),
                }}
                source={images.icon_close} />
            </TouchableOpacity>
          </View >
          <View style={{ flex: 1, marginTop: verticalScale(10), width: '100%', backgroundColor: colors.containerBg }}>
            {this.dataAlert?.placeholderText ? <InputBase
              // titleInput={this.state.jobTypeChosen.length >= 3 ? "Bạn đã chọn tối đa 3 ngành nghề cho phép" : 'Chọn tối đa 3 ngành nghề'}
              // titleInputStyle={{ marginLeft: 0, fontWeight: '400', color: this.state.jobTypeChosen.length >= 3 ? R.colors.warningColor : R.colors.textColor }}
              style={{ alignSelf: 'center', width: R.DEVICE_WIDTH - verticalScale(30), marginTop: verticalScale(10), marginBottom: verticalScale(20) }}
              initValue={''}
              onFocus={() => { }}
              placeholder={this.dataAlert?.placeholderText}
              placeholderColor={colors.greyColor}
              type={'NORMAL'}
              onChangeText={txt => {
                const newDataFillter = this.dataAlert?.data.filter(item => {
                  const itemData = removeVietnameseTones(item.name || item.address || item.addressDetail || item.label).toUpperCase();
                  const textData = removeVietnameseTones(txt).toUpperCase();
                  return itemData.indexOf(textData) > -1;
                }) || [];
                // console.log("new search", newDataFillter);
                this.setState({ newData: newDataFillter })
              }}
              iconRight={images.icon_search}
              iconRightStyle={{ width: verticalScale(25), height: verticalScale(25) }}
              contentStyle={{ backgroundColor: colors.borderGreyColor }}
              borderColor={colors.borderGreyColor}
            /> : null}
            <FlatList
              data={this.state.newData}
              keyExtractor={(item: any, index: number) => `${item.id} ${index}`}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (<View style={{ height: verticalScale(74) }} />)}
            />
          </View>
          {
            this.dataAlert?.titleButton1 ? (
              <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: verticalScale(74), marginBottom: Platform.OS == 'ios' ? 20 : 40 }, this.dataAlert?.viewButton]}>
                <BaseButton
                  title={this.dataAlert?.titleButton1}
                  style={this.dataAlert?.styleButton1}
                  onPress={() => {
                    this.close();
                    this.dataAlert?.onButton1Press?.()
                  }}
                />
              </View>
            ) : null
          }
        </View>
      </Animated.View>
    );

    if (isOpen) {
      return (
        <View style={[styles.absolute, { zIndex: 1000, elevation: 1000 }]}>
          <TapGestureHandler onHandlerStateChange={this.handleTap}>
            <Animated.View
              style={[
                styles.background,
                { backgroundColor: 'black' },
                lightboxOpacityStyle
              ]}
            />
          </TapGestureHandler>
          {content}
        </View>
      )
    }

    return null
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: verticalScale(10),
    height: verticalScale(40),
    width: '90%',
    flexDirection: 'row',
    borderBottomColor: colors.borderGreyColor,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default React.memo(DropdownListNew);
