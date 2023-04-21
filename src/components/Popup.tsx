import React, {PureComponent} from 'react';

import {
  Animated,
  BackHandler,
  Easing,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../constants';
import R from './R';
import {verticalScale} from './Scales';
import TextBase from './TextBase';

interface Props {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface States {
  isOpen: boolean;
  page: number;
}

interface PropsPopup {
  onOpen: (() => void | null) | null,
  onClose: (() => void | null) | null,
  renderItem: ((item: any, index: number) => void | null) | null,
  height: number,
  data: any[],
}

const {
  Value
} = Animated;

class Popup extends PureComponent<Props, States> {
  _anim: Animated.Value;
  dataPopup: PropsPopup| null;

  constructor(props: Props) {
    super(props);

    this.dataPopup = null;
    this._anim = new Value(0);
  }

  state: States = {
    isOpen: this.props.isOpen || false,
    page: 0
  };

  show = (props: PropsPopup) => {
    this.dataPopup = {
      onOpen: props.onOpen || null,
      onClose: props.onClose || null,
      renderItem: props.renderItem || null,
      height: props.height ? Math.min(R.DEVICE_HEIGHT, props.height) : R.DEVICE_HEIGHT,
      data: props.data || []
    };
    this.open();
  }

  open = () => {
    this.setState({
      isOpen: true,
      page: 0
    }, () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      Animated.spring(this._anim, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        this.dataPopup?.onOpen?.();
      });
    });
  }

  hide = () => {
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
      this.dataPopup?.onClose?.();
      this.dataPopup = null;
    });
  }

  handleBackButton = () => {
    this.hide();
    return true;
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    if (this.props.isOpen !== props.isOpen && props.isOpen) {
      this.open();
    }
  }

  componentWillUnmount() {
  }

  handleScroll = (event: any) => {
    if (Math.round(event?.nativeEvent?.contentOffset?.x / R.DEVICE_WIDTH) !== this.state.page) {
      this.setState({
        page: Math.round(event?.nativeEvent?.contentOffset?.x / R.DEVICE_WIDTH)
      })
    }
  }

  renderContent = () => {
    const {page} = this.state;
    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={R.DEVICE_WIDTH}
          snapToAlignment="center"
          decelerationRate={0}
          bounces={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          {
            this.dataPopup?.data.map((item: any, index: number) => 
              this.dataPopup?.renderItem?.(item, index)
            )
          }
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          {
            this.dataPopup?.data.map((item: any, index: number) => (
              <View style={{width: verticalScale(10), height: verticalScale(10), borderRadius: verticalScale(10), backgroundColor: page === index ? colors.mainColor : '#B5B5B5', marginRight: verticalScale(10)}}/>
            ))
          }
        </View>
        <TouchableOpacity
          style={{borderWidth: 1, borderColor: colors.mainColor, paddingVertical: verticalScale(15), paddingHorizontal: verticalScale(50), borderRadius: verticalScale(10), marginVertical: verticalScale(50)}}
          onPress={this.hide}
        >
          <TextBase title={'Đã hiểu'} style={{color: colors.mainColor, fontWeight: 'bold'}}/>
        </TouchableOpacity>
      </>
    )
  }

  render() {
    const {
      isOpen,
    } = this.state;

    const openStyle = [{
      transform: [
        {
          scale: this._anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          })
        }
      ]
    }];

    const _opacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    };

    const content = (
      <Animated.View pointerEvents='box-none' style={[openStyle, _opacityStyle, styles.center, {height: this.dataPopup?.height}]}>
        {this.renderContent()}
      </Animated.View>
    );

    if (isOpen) {
      return (
        <View style={[styles.absolute, {zIndex: 1000, elevation: 1000, backgroundColor: 'rgba(255, 255, 255, 0.95)'}]}>
          {content}
        </View>
      )
    }

    return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewButton: {
    height: verticalScale(50),
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: verticalScale(8),
    marginVertical: verticalScale(16),
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: verticalScale(8),
    borderRadius: verticalScale(10),
    borderColor: colors.mainColor,
  },
  txtButton: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  viewContent: {
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  txtMessage: {
    fontSize: verticalScale(16),
    textAlign: 'center'
  }
});

export default Popup;

