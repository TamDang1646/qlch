import React from 'react';

import {
  ImageStyle,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../constants/colors';
import {verticalScale} from './Scales';

interface Props {
    style?: ViewStyle|ViewStyle[],
    contentStyle?: ViewStyle,
    type?: 'numeric' | 'default' | 'number-pad',
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
interface States {
    value: string,
    text: string,
    focus: boolean,
    blur: boolean,
    error: boolean,
    errorContent: string,
    disable: boolean,
}
export default class TextInputBase extends React.Component<Props, States>{
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            text: '',
            focus: false,
            blur: true,
            error: false,
            errorContent: '',
            disable: false,
        }
    }
    componentDidMount() {
        const isValid = this.validateTextInput(this.props.initValue);
        this.setState({
            value: this.props.initValue,
            text: this.props.initValue,
            focus: this.props.initValue?.trim().length > 0,
            blur: true,
            error: isValid,
            disable: this.props.disabled ? this.props.disabled : false,
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(this.state.value, isValid);
            }
        });
    }
    validateTextInput(text: string): boolean {

        if (this.state.error) {
            return true;
        }

        return false;
    }

    render() {
        const {disabled, titleInputStyle,style, onChangeText, initValue, placeholder, placeholderColor, iconLeft, iconLeftStyle, iconRight, iconRightStyle, pressIconRight,type='default' } = this.props;
        return <View style={[styles.container, style]}>
            {
                iconLeft ?? null
            }
            <TextInput
                {...this.props}
                style={[styles.textStyle,titleInputStyle]}
                onChangeText={onChangeText}
                value={initValue ?? ''}
                placeholder={placeholder ?? 'useless placeholder'}
                placeholderTextColor={placeholderColor ?? colors.grayColor}
                keyboardType={type}
                editable={!disabled}
            />
            {
                iconRight ?? null
            }
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: verticalScale(46),
        // margin: verticalScale(16),
        borderColor: colors.mainGreyColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: verticalScale(8),
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: verticalScale(20)
    },
    textStyle: {
        paddingHorizontal: verticalScale(8),
        height: verticalScale(45),
        // width: '80%',
        fontSize: verticalScale(16),
        flex: 1
    }
});