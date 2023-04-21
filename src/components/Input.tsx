import React, {Component} from 'react';

import {
  Image,
  ImageStyle,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../constants/colors';
import {verticalScale} from './Scales';
import TextBase from './TextBase';

export type InputBaseProps = {
    style?: ViewStyle,
    contentStyle?: ViewStyle,
    type: 'NORMAL' | 'MONEY' | 'NUMBER' | 'BUTTON',
    initValue: string,
    placeholder: string,
    placeholderColor?: string,
    textInputColor?: string,
    currency?: string,
    onChangeText?: (text: string, isValid?: boolean) => void,
    filterText?: (text: string) => string,
    onBlur?: () => void,
    onFocus?: () => void,
    secureTextEntry?: boolean,
    caption?: string,
    captionStyle?: TextStyle,
    iconRight?: any,
    pressIconRight?: () => void,
    iconRightStyle?: ImageStyle,
    viewInputStyle?: ViewStyle,
    viewIconRightStyle?: ViewStyle,

    viewIconLeftStyle?: ViewStyle
    iconLeft?: any,
    pressIconLeft?: () => void,
    iconLeftStyle?: ImageStyle,

    maxLength?: number,
    borderDisable?: boolean,
    disabled?: boolean,
    borderColor?: string,

    textInputProps?: any,
    source?: any,
    autoFocus?: boolean,
    isUpperCase?: boolean,
    smallContent?: boolean,
    keyScreen?: string,

    titleInput?: string,
    titleInputStyle?: TextStyle,
    viewInsert?: any,
    viewInsertContent?: any,
    viewInsertStyle?: ViewStyle
    require?: boolean
}

type InputBaseState = {
    value: string,
    text: string,
    focus: boolean,
    blur: boolean,
    error: boolean,
    errorContent: string,
    disable: boolean,
}

export default class InputBase extends Component<InputBaseProps, InputBaseState> {

    state: InputBaseState = {
        value: '',
        text: '',
        focus: false,
        blur: true,
        error: false,
        errorContent: '',
        disable: false,
    }


    componentDidMount() {
        const isValid = this.validateTextInput(this.props.initValue);
        this.setState({
            value: this.props.initValue,
            text: this.props.initValue,
            focus: this.props.initValue.trim().length > 0,
            blur: true,
            error: isValid,
            disable: this.props.disabled ? this.props.disabled : false,
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(this.state.value, isValid);
            }
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps: InputBaseProps) {
        if (nextProps) {
            this.setState({
                disable: nextProps.disabled != undefined ? nextProps.disabled : false,
            })
        }
    }


    _textInput?: TextInput;
    _textInputAllocCallback?: () => void;

    _getCurrentValue() {
        return this.state.value;
    }

    _setText(text: string, callback?: () => void) {
        // console.log("_setText", text);
        this.setState({
            value: text,
            text: text,
            focus: text.length > 0,
        }, () => {
            if (callback) {
                callback();
            }
        })
    }

    _setDisable(isDisable: boolean) {
        this.setState({
            disable: isDisable,
            blur: true,
        });
    }

    _setError(error: boolean, errorContent: string) {
        this.setState({
            error: error,
            errorContent: errorContent,
        })
    }

    _focusToTextInput = () => {
        if (this.state.disable) {
            return;
        }

        this._textInputAllocCallback = () => {
            if (this._textInput && !this.state.disable) {
                setTimeout(() => {
                    if (this._textInput) {
                        try {
                            this._textInput.focus();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }, 0);
            }
            this._textInputAllocCallback = undefined;
        }
        this.setState({
            focus: true,
            blur: this.state.disable ? true : false,
        });
    }

    _blurTextInput = () => {
        this.setState(prevState => {
            return ({
                focus: prevState.value.trim().length > 0,
                value: prevState.value.trim(),
                blur: true,
            });
        }, () => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
            this._textInput && this._textInput.blur();
        });
    }

    _focusInput = () => {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
        this.setState({
            blur: false,
        })
    }

    _pressIconRight = () => {
        if (this.props.pressIconRight) {
            this.props.pressIconRight();
        }
    }
    _pressIconLeft = () => {
        if (this.props.pressIconLeft) {
            this.props.pressIconLeft();
        }
    }

    _onChangeText = async (text: string) => {
        let value = text.trim()
        if (this.props.filterText) {
            text = this.props.filterText(text);
        }
        const isValid = this.validateTextInput(text);

        this.setState({
            value: value,
            text,
            error: isValid,
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(this.state.value, isValid);
            }
        });
        return
    }

    validateTextInput(text: string): boolean {

        if (this.state.error) {
            return true;
        }

        return false;
    }

    render() {
        const { source, keyScreen, viewInsert } = this.props;
        // let color_border = this.state.error ? colors.inputErrorColor : colors.inputColor;
        let color_text_input = this.state.error ? colors.inputErrorColor : colors.inputColor;
        // let color_text_caption = this.state.error ? colors.inputErrorColor : colors.inputColor;

        let existCurrency = this.props.currency && this.props.currency.length > 0 ? true : false;
        let showErrorView = this.state.error == true && this.state.errorContent != undefined && this.state.errorContent.length > 0;

        return (
            <View style={[{
                width: '100%',
            }, this.props.style]}>
                {this.props.titleInput ?
                    (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(10), marginLeft: verticalScale(20) }}>
                            <TextBase title={this.props.titleInput} style={[{ fontWeight: 'bold' }, this.props.titleInputStyle]} />
                            {
                                this.props.require ? <Text style={{ color: 'red' }}> (*) </Text> : null
                            }
                        </View>
                    ) : null}

                <View
                    style={[{
                        backgroundColor: colors.containerBg,
                        borderRadius: verticalScale(10),
                        justifyContent: 'center',
                        borderWidth: this.props.borderDisable ? 0 : verticalScale(1),
                        borderColor: this.state.error ? colors.warningColor : (this.props.borderColor ? this.props.borderColor : colors.inputBorderColor),
                    }, {
                        ...this.props.contentStyle,
                        borderBottomColor: this.props.contentStyle && this.props.contentStyle.borderBottomColor ? (this.state.error ? colors.warningColor : this.props.contentStyle.borderBottomColor) : undefined
                    }]}
                >
                    <View style={[{ flexDirection: 'row' }, this.props.viewInputStyle]}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: this.props.smallContent ? verticalScale(36) : verticalScale(46),
                                paddingHorizontal: verticalScale(16),
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {
                                    this.props.iconLeft &&
                                    <View style={[{ justifyContent: 'flex-start', width: verticalScale(50) }, this.props.viewIconLeftStyle]}>
                                        {
                                            this.props.pressIconLeft ? (
                                                <TouchableOpacity style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                    onPress={() => this._pressIconRight()}>
                                                    {
                                                        this.props.iconLeft &&
                                                        <Image source={this.props.iconLeft} style={[{ alignItems: 'center', width: verticalScale(20), height: verticalScale(20), resizeMode: 'contain' }, this.props.iconLeftStyle ? this.props.iconLeftStyle : {}]} />
                                                    }
                                                </TouchableOpacity>
                                            ) : (
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    {
                                                        this.props.iconLeft &&
                                                        <Image source={this.props.iconLeft} style={[{ alignItems: 'center', width: verticalScale(20), height: verticalScale(20), resizeMode: 'contain' }, this.props.iconLeftStyle ? this.props.iconLeftStyle : {}]} />
                                                    }
                                                </View>
                                            )
                                        }
                                    </View>
                                }
                                {
                                    keyScreen ?
                                        <TextInput
                                            allowFontScaling={false}
                                            autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
                                            ref={ref => {
                                                if (ref) {
                                                    this._textInput = ref;
                                                    if (this._textInputAllocCallback) {
                                                        this._textInputAllocCallback();
                                                    }
                                                }
                                            }}
                                            value={this.state.text}
                                            style={{
                                                height: verticalScale(46),
                                                fontSize: verticalScale(16),
                                                color: this.state.error ? colors.warningColor : (this.props.textInputColor ? this.props.textInputColor : color_text_input),
                                                flex: 1,
                                                fontFamily: 'Roboto'
                                            }}
                                            keyboardAppearance={this.props.secureTextEntry ? 'dark' : 'default'}
                                            maxLength={this.props.maxLength}
                                            editable={!this.state.disable}
                                            onFocus={this._focusInput}
                                            onBlur={this._blurTextInput}
                                            onChangeText={this._onChangeText}
                                            placeholder={this.props.placeholder}
                                            placeholderTextColor={this.props.placeholderColor ? this.props.placeholderColor : colors.inputBorderColor}
                                            secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                                            {...this.props.textInputProps}
                                        />
                                        :
                                        <TextInput
                                            allowFontScaling={false}
                                            autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
                                            ref={ref => {
                                                if (ref) {
                                                    this._textInput = ref;
                                                    if (this._textInputAllocCallback) {
                                                        this._textInputAllocCallback();
                                                    }
                                                }
                                            }}
                                            keyboardType={(this.props.type == 'MONEY' || this.props.type == 'NUMBER') ? 'number-pad' : 'default'}
                                            value={this.state.text}
                                            style={{
                                                height: verticalScale(46),
                                                fontSize: verticalScale(16),
                                                color: this.state.error ? colors.warningColor : (this.props.textInputColor ? this.props.textInputColor : color_text_input),
                                                flex: 1,
                                                fontFamily: 'Roboto',
                                            }}
                                            keyboardAppearance={this.props.secureTextEntry ? 'dark' : 'default'}
                                            maxLength={this.props.maxLength}
                                            editable={!this.state.disable}
                                            onFocus={this._focusInput}
                                            onBlur={this._blurTextInput}
                                            onChangeText={this._onChangeText}
                                            placeholder={this.props.placeholder}
                                            placeholderTextColor={this.props.placeholderColor ? this.props.placeholderColor : colors.inputBorderColor}
                                            secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                                            {...this.props.textInputProps}
                                        />
                                }
                                {
                                    source ?
                                        <View style={{ justifyContent: 'flex-end', width: verticalScale(60) }}>
                                            <View style={{
                                                alignItems: 'flex-end',
                                                flex: 1,
                                                justifyContent: 'center'
                                            }}>
                                                <Image source={source} />
                                            </View>
                                        </View> : existCurrency ? <View style={{ justifyContent: 'flex-end', width: verticalScale(50) }}>
                                            <View style={{
                                                alignItems: 'center',
                                                flex: 1,
                                                justifyContent: 'center',
                                            }}>
                                                <TextBase title={this.props.currency}></TextBase>
                                            </View>
                                        </View> : null
                                }
                                {
                                    viewInsert ?
                                        <View style={[{ width: '100%' }, this.props.viewInsertStyle]} >
                                            {this.props.viewInsertContent}
                                        </View> : null
                                }
                            </View>
                        </View>
                        {
                            this.props.iconRight &&
                            <View style={[{ justifyContent: 'flex-end', width: verticalScale(50) }, this.props.viewIconRightStyle]}>
                                {
                                    this.props.pressIconRight ? (
                                        <TouchableOpacity style={{
                                            alignItems: 'center',
                                            flex: 1,
                                            justifyContent: 'center',
                                        }}
                                            onPress={() => this._pressIconRight()}>
                                            {
                                                this.props.iconRight &&
                                                <Image source={this.props.iconRight} style={[{ alignItems: 'center', width: verticalScale(20), height: verticalScale(20), resizeMode: 'contain' }, this.props.iconRightStyle ? this.props.iconRightStyle : {}]} />
                                            }
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={{
                                            alignItems: 'center',
                                            flex: 1,
                                            justifyContent: 'center',
                                        }}>
                                            {
                                                this.props.iconRight &&
                                                <Image source={this.props.iconRight} style={[{ alignItems: 'center', width: verticalScale(20), height: verticalScale(20), resizeMode: 'contain' }, this.props.iconRightStyle ? this.props.iconRightStyle : {}]} />
                                            }
                                        </View>
                                    )
                                }

                            </View>
                        }
                    </View>
                </View>
                {
                    showErrorView &&
                    <TextBase title={this.state.errorContent}
                        style={{
                            fontSize: verticalScale(15),
                            color: colors.inputErrorColor,
                        }} />
                }
                {
                    (this.props.caption) &&
                    <TextBase title={this.props.caption}
                        style={[{
                            fontSize: verticalScale(15),
                            color: colors.textColor,
                        }, this.props.captionStyle]} />
                }
            </View >

        )
    }
}