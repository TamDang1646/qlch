import React, { PureComponent } from 'react';

import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { colors } from '../constants';
import Icon from './Icon';
import InputBase from './InputBase';
import { verticalScale } from './Scales';
import TextBase from './TextBase';

const SCREEN = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
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
}

interface PropsAlert {
  title: string | null,
  message: string | null,
  renderMessage: (() => void | null) | null,
  leftButton: any,
  leftButtonStyle?: any,
  leftButtonTextStyle?: any,
  rightButton: any,
  rightButtonStyle?: any,
  rightButtonTextStyle?: any,
  onOpen: (() => void | null) | null,
  onClose: (() => void | null) | null,
  renderContent: (() => void | null) | null,
  renderContentHasTextInput: boolean | null,
  width: number | null,
  blurView: any,
  hasTextInput: boolean | null,
  notScale: boolean | null,
  styleMessage?: TextStyle,
  onChangeText: (() => void | null) | null,
  placeHolder: string | null;
  value: string | null;
  descInput: string | null;
  requireMinLength: boolean;
  renderHeaderInput: (() => void | null) | null;
  closeButton?: boolean;
  renderMessageUserInfo: boolean;
  hasUserInfo: boolean;
  hasUserProfile: boolean;
}

const {
  Value
} = Animated;

class Alert extends PureComponent<Props, States> {
  _anim: Animated.Value;
  dataAlert: PropsAlert | null;
  timeoutAlertLeftButton: any;
  timeoutAlertRightButton: any;

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
    text: ''
  };

  alert = (props: PropsAlert) => {
    this.dataAlert = {
      title: props.title ? props.title : null,
      message: props.message ? props.message : null,
      renderMessage: props.renderMessage ? props.renderMessage : null,
      leftButton: props.leftButton ? props.leftButton : null,
      rightButton: props.rightButton ? props.rightButton : null,
      onOpen: props.onOpen ? props.onOpen : null,
      onClose: props.onClose ? props.onClose : null,
      renderContent: props.renderContent ? props.renderContent : null,
      renderContentHasTextInput: props.renderContentHasTextInput ? props.renderContentHasTextInput : null,
      width: props.width ? props.width : null,
      blurView: props.blurView ? props.blurView : null,
      hasTextInput: props.hasTextInput ? props.hasTextInput : null,
      notScale: props.notScale ? props.notScale : null,
      styleMessage: props.styleMessage ? props.styleMessage : {},
      onChangeText: props.onChangeText || null,
      placeHolder: props.placeHolder || '',
      value: props.value || '',
      descInput: props.descInput || '',
      requireMinLength: props.requireMinLength || false,
      renderHeaderInput: props.renderHeaderInput || null,
      closeButton: props.closeButton || false,
      renderMessageUserInfo: props.renderMessageUserInfo || false,
      hasUserProfile: props.hasUserProfile || false,
      hasUserInfo: props.hasUserInfo || false,
      leftButtonStyle: props.leftButtonStyle || null,
      rightButtonStyle: props.rightButtonStyle || null,
      leftButtonTextStyle: props.leftButtonTextStyle || null,
      rightButtonTextStyle: props.rightButtonTextStyle || null,
    };
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
      }).start(() => {
        this.dataAlert?.onOpen?.();
      });
    });
  }

  close = (onClose?: () => void) => {
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
      this.dataAlert?.onClose?.();
      this.dataAlert = null;
      onClose && onClose();
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

  componentWillUnmount() {
    if (this.timeoutAlertLeftButton) {
      clearTimeout(this.timeoutAlertLeftButton);
    }

    if (this.timeoutAlertRightButton) {
      clearTimeout(this.timeoutAlertRightButton);
    }
  }

  renderButton = () => {
    let leftButton: any = null;
    let rightButton: any = null;
    let leftButtonStyle: any = null;
    let rightButtonStyle: any = null;
    let leftButtonTextStyle: any = null;
    let rightButtonTextStyle: any = null;
    let width = null;
    if (this.dataAlert) {
      leftButton = this.dataAlert.leftButton;
      rightButton = this.dataAlert.rightButton;
      leftButtonStyle = this.dataAlert.leftButtonStyle;
      rightButtonStyle = this.dataAlert.rightButtonStyle;
      leftButtonTextStyle = this.dataAlert.leftButtonTextStyle;
      rightButtonTextStyle = this.dataAlert.rightButtonTextStyle;
    }
    if (this.dataAlert && this.dataAlert.width) {
      width = this.dataAlert.width;
    }

    if (!leftButton && !rightButton) return null;

    return (
      <View style={[styles.viewButton, width ? { width } : {}]}>
        {
          leftButton && leftButton.text && (
            <TouchableOpacity
              onPress={() => {
                !leftButton.unHide && this.close();

                if (this.timeoutAlertLeftButton) {
                  clearTimeout(this.timeoutAlertLeftButton);
                }

                this.timeoutAlertLeftButton = setTimeout(() => {
                  leftButton.onPress && leftButton.onPress();
                }, 220);
              }}
              style={[styles.button, { borderWidth: 1, borderColor: colors.mainColor },leftButtonStyle]}
            >
              <TextBase title={leftButton.text} style={[styles.txtButton, { color: colors.mainColor },leftButtonTextStyle]} />
            </TouchableOpacity>
          )
        }
        {
          rightButton && rightButton.text && (
            <TouchableOpacity
              onPress={() => {
                if (this.dataAlert?.renderContentHasTextInput && this.dataAlert?.requireMinLength && this.state.text.trim() && this.state.text.trim().length < 10) {
                  return;
                }
                if (!rightButton.dontClose) {
                  !rightButton.unHide && this.close();
                  if (this.timeoutAlertRightButton) {
                    clearTimeout(this.timeoutAlertRightButton);
                  }

                  this.timeoutAlertRightButton = setTimeout(() => {
                    rightButton.onPress && rightButton.onPress(this.state.text.trim());
                  }, 220);
                } else {
                  rightButton.onPress && rightButton.onPress(this.state.text.trim());
                }               
              }}
              style={[
                styles.button,
                { backgroundColor: this.dataAlert?.renderContentHasTextInput ? this.state.text.trim() ? colors.mainColor : colors.grayColor : colors.mainColor },
                rightButtonStyle
              ]}
            >
              <TextBase title={rightButton.text} style={[styles.txtButton, { color: 'white' },rightButtonTextStyle]} />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }

  renderContent = () => {
    let message = null;
    let title = null;
    let renderContent = null;
    let renderContentHasTextInput = null;
    let renderMessage = null;
    let styleMessage: (TextStyle | undefined) = {}
    let placeHolder = null;
    let value = null;
    let descInput = null;
    let renderHeaderInput = null;

    if (this.dataAlert) {
      message = this.dataAlert.message;
      title = this.dataAlert.title;
      renderContent = this.dataAlert.renderContent;
      renderContentHasTextInput = this.dataAlert.renderContentHasTextInput;
      renderMessage = this.dataAlert.renderMessage;
      styleMessage = this.dataAlert.styleMessage;
      placeHolder = this.dataAlert.placeHolder;
      value = this.dataAlert.value;
      descInput = this.dataAlert.descInput;
      renderHeaderInput = this.dataAlert.renderHeaderInput;
    }

    if (renderContent) {
      return renderContent();
    }

    if (renderContentHasTextInput) {
      return (
        <View style={styles.viewContent}>
          {
            title ? <TextBase title={title} style={[styles.txtTitle]} /> : null
          }
          <View>
            {
              descInput ? <TextBase title={descInput} style={{ marginTop: verticalScale(15), marginBottom: verticalScale(5) }} /> : null
            }
            {
              renderHeaderInput ? renderHeaderInput() : null
            }
            <InputBase
              style={{ alignSelf: 'center', width: verticalScale(260), marginTop: descInput ? 0 : verticalScale(15) }}
              contentStyle={{ height: verticalScale(48) }}
              initValue={value || ''}
              onFocus={() => { }}
              onChangeText={v => this.setState({ text: v })}
              placeholder={placeHolder || strings('CandidateManagelydokhac')}
              type={'NORMAL'}
              smallContent={true}
            />

            {
              this.dataAlert?.requireMinLength && this.dataAlert?.renderContentHasTextInput && this.state.text.trim().length < 10 && <TextBase title={strings('GroupCandidate.errorGroupName')} style={{ marginTop: verticalScale(15), marginBottom: verticalScale(5), color: 'red', fontSize: verticalScale(10) }} />
            }
          </View>

        </View>
      )
    }

    return (
      <View style={styles.viewContent}>
        {
          title && <TextBase title={title} style={[styles.txtTitle]} />
        }
        {
          this.dataAlert?.renderMessageUserInfo ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
              {/* <IconSvgInactive width={verticalScale(130)} height={verticalScale(90)} /> */}
              <TextBase title={'Không đủ thông tin'} style={{ paddingHorizontal: verticalScale(16), textAlign: 'justify', marginTop: verticalScale(10), color: 'red', fontWeight: 'bold' }} />
            </View>
          ) : renderMessage ? renderMessage() : message && <TextBase title={message} style={[styles.txtMessage, styleMessage, title ? { marginTop: 25 } : undefined]} />
        }
      </View>
    );
  }

  handleTap = () => {
    //FIXME: should add a prop to handle this
    // this.close()
  }
  renderCloseButton() {
    let closeButton = false;
    if (this.dataAlert) {
      closeButton = this.dataAlert.closeButton || false;
    }
    return (
      closeButton ?
        <TouchableOpacity
          onPress={() => this.close()}
          style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, top: 0 }}
        >
          <Icon name="Add" color="black" size={20} style={{ transform: [{ rotate: '45deg' }] }} />
        </TouchableOpacity>
        : null
    )
  }
  render() {
    const origin = {
      x: SCREEN.width / 2,
      y: SCREEN.height / 2,
      width: 0,
      height: 0
    };
    const width = verticalScale(Math.min(320, SCREEN.width - 16));

    const {
      isOpen,
      target,
    } = this.state;
    const hasTextInput = !!this.dataAlert && !!this.dataAlert.hasTextInput ? this.dataAlert.hasTextInput : false;

    const lightboxOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp'
      })
    };

    const openStyle = [{
      left: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.x, target.x], extrapolate: 'clamp' }),
      top: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.y, target.y], extrapolate: 'clamp' }),
      width: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.width, SCREEN.width], extrapolate: 'clamp' }),
      height: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.height, SCREEN.height], extrapolate: 'clamp' }),
      transform: [
        {
          scale: (this.dataAlert && this.dataAlert.notScale) ? 1 : this._anim.interpolate({
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

    const background = (
      <TapGestureHandler onHandlerStateChange={this.handleTap}>
        <Animated.View
          style={[
            styles.background,
            { backgroundColor: 'black' },
            lightboxOpacityStyle
          ]}
        />
      </TapGestureHandler>
    );

    const content = (
      <Animated.View pointerEvents='box-none' style={[openStyle, _opacityStyle, styles.center]}>
        <View style={
          [
            styles.content,
            {
              width: !!this.dataAlert && !!this.dataAlert.width ? this.dataAlert.width : width,
              borderRadius: verticalScale(12),
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }
          ]}
        >

          <View style={[styles.absolute, { backgroundColor: 'white' }]} />
          {this.renderContent()}
          {this.renderButton()}
          {this.renderCloseButton()}
        </View>
      </Animated.View>
    );

    if (isOpen) {
      return (
        <View style={[styles.absolute, { zIndex: 1000, elevation: 1000 }]}>
          {background}
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
    alignItems: 'center'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    // borderWidth: 1,
    marginHorizontal: verticalScale(8),
    borderRadius: verticalScale(10),
    // borderColor: colors.mainColor,
  },
  txtButton: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  viewContent: {
    alignItems: 'center',
    paddingVertical: verticalScale(16),
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
    textAlign: 'center',
    marginHorizontal: verticalScale(16)
  }
});

export default Alert;
