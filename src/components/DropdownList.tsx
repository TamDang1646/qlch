import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Keyboard,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

import {colors} from '../constants/colors';
import {removeVietnameseTones} from '../utils/Utils';
import BaseButton from './BaseButton';
import Icon from './Icon';
import InputBase from './InputBase';
import R from './R';
import {verticalScale} from './Scales';
import TextBase from './TextBase';

interface Props {
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
  onButton1Press?: Function,//return boolean value to indicate that we should close the popup or not
  onButton2Press?: () => boolean,
  buttonDisable1?: boolean,
  buttonDisable2?: boolean,
  imageRightItem?: ImageSourcePropType,
  imageRightItemStyle?: ImageStyle,
  parentCallBack?: (text: any) => void,
  filter?: boolean
}

interface State {
  isVisible: boolean,
  newData: any[],
  onKeyboard: boolean,
  isNewData: boolean
}


const DropdownList = (props: Props) => {
  const { buttonDisable1, buttonDisable2, parentCallBack, onSelect, imageRightItem, touchStyle, viewStyle, title, styleTitle, placeholderText = '', data, viewButton, titleButton1, styleButton1, titleButton2, styleButton2, onButton1Press, onButton2Press, filter=false } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [newData, setNewData] = useState(props.data);
  const [onKeyboard, setOnKeyboard] = useState(false);
  useEffect(() => {
    setNewData(data)
  }, [data])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setOnKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setOnKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onPressItem = (item: any, index: any) => {
    setIsVisible(false);
    onSelect(index, item);
  }
  const _onButton1Pressed = () => {
    if (onButton1Press) {
      const result = onButton1Press()
      if (result) {
        setIsVisible(false);
      }
    }
  }
  const _onButton2Pressed = async () => {
    if (onButton2Press) {
      const result = onButton2Press()
      if (result) {
        setIsVisible(false);
      }
    }
  }
  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity key={index} onPress={() => { onPressItem(item, index) }}
        style={{
          marginTop: verticalScale(10), height: verticalScale(40), width: '90%', flexDirection: 'row',
          borderBottomColor: colors.borderGreyColor, borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center'
        }}
      >
        <TextBase
          title={item.name}
          numberOfLines={2}
          style={[{
            fontSize: verticalScale(15.5),
            marginLeft: verticalScale(5),
            width: '80%'
          }]} />
        {imageRightItem ? <Image source={imageRightItem} style={{
          width: verticalScale(22),
          height: verticalScale(22),
          resizeMode: 'contain'
        }}></Image> : null}

      </TouchableOpacity>
    )
  }
  return (

    <>
      <TouchableOpacity style={touchStyle} onPress={() => setIsVisible(true)}>
        {props.children}
      </TouchableOpacity>

      <Modal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'flex-end',
          marginTop: onKeyboard ? verticalScale(50) : verticalScale(200),
          margin: 0
        }}
        onBackButtonPress={() => setIsVisible(false)}
        backdropTransitionOutTiming={0}
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
      >
        <View style={[viewStyle, {
          backgroundColor: colors.containerBg,
          borderTopLeftRadius: verticalScale(20), borderTopRightRadius: verticalScale(20),
          flex: 1,
          overflow: 'hidden',
          borderWidth: 1
        }]}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#F5F5F8',
            height: verticalScale(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TextBase
              title={title}
              style={[{
                fontSize: verticalScale(18),
                fontWeight: 'bold',
                textAlign: 'center',
                color: colors.mainColor
              }, styleTitle]} />

            <TouchableOpacity
              onPress={() => { setIsVisible(false) }}
              style={{
                width: verticalScale(50),
                height: verticalScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 0
              }}>
              <Icon
                name='times'
                size={verticalScale(18)}
              />
            </TouchableOpacity>
          </View >
          <View style={{ flex: 1, marginTop: verticalScale(10), width: '100%', backgroundColor: colors.containerBg }}>
            {filter?<InputBase
              style={{ alignSelf: 'center', width: R.DEVICE_WIDTH - verticalScale(30), marginTop: verticalScale(10), marginBottom: verticalScale(20) }}
              type='NORMAL'
              onChangeText={txt => {
                const newDataFillter = data.filter(item => {
                  const itemData = removeVietnameseTones(item.name).toUpperCase();
                  const textData = removeVietnameseTones(txt).toUpperCase();
                  return itemData.indexOf(textData) > -1;
                });
                // console.log("new search", txt);
                parentCallBack ? parentCallBack(txt) : null;
                setNewData(newDataFillter);
              }}
              placeholder='Tìm kiếm'
              initValue={''}
              iconRight={
                <Icon
                  name={'Search'}
                  size={verticalScale(20)}
                  color={'rgba(1,1,1,0.4)'}
                />
              }
            />:null}

            <ScrollView style={{ flex: 1, width: '100%', marginBottom: verticalScale(10) }} showsVerticalScrollIndicator={false}>
              {newData?.map((item, i) => (
                renderItem(item, i)
              ))}
            </ScrollView>

            <View style={[{ flexDirection: 'row' }, viewButton]}>
              {titleButton1 ? <BaseButton title={titleButton1} disable={buttonDisable1}
                style={styleButton1} onPress={_onButton1Pressed} /> : null}
              {/* {console.log(data)} */}
              {titleButton2 ? <BaseButton title={titleButton2} disable={buttonDisable2}
                style={styleButton2} onPress={_onButton2Pressed} /> : null}

            </View>

          </View>


        </View>
      </Modal>

    </>

  );
}


export default React.memo(DropdownList);