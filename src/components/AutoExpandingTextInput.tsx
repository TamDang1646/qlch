import React from 'react';

import {
  Animated,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../constants';
import {verticalScale} from './Scales';

interface Props {
    contentStyle?: ViewStyle,
    placeholder: string,
    placeholderColor?: string,
    textInputColor?: string,
    onChangeText?: (text: string, isValid?: boolean) => void,
    filterText?: (text: string) => string,
    onBlur?: () => void,
    onFocus?: () => void,
    borderColor?: string,
    titleInput?: string,
    titleInputStyle?: TextStyle,
    initValue: string,
    disabled?: boolean,
    type?: 'numeric' | 'default' | 'number-pad',
}
interface States {
    value: string,
    text: string,
    focus: boolean,
    blur: boolean,
    error: boolean,
    errorContent: string,
    disable: boolean,
    height: number,
}
const {
    Value
  } = Animated;
class AutoExpandingTextInput extends React.Component<Props, States> {
    height: Animated.Value;
    constructor(props: Props) {
        super(props)
        this.state = {
            value: '',
            text: '',
            focus: false,
            blur: true,
            error: false,
            errorContent: '',
            disable: false,
            height: verticalScale(46)
        }
        this.height = new Value(0);
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
    onTextChange({ text }: { text: string }) {
        // console.log(event);
        
        // const { contentSize, text } = event.nativeEvent;

        this.setState({
            text: text,
            // height: contentSize?.height > 100 ? 100 : contentSize?.height
        });
    }

    render() {
        const { initValue, onChangeText, placeholder, placeholderColor, titleInputStyle, type = 'default' } = this.props;
    //    console.log('height',this.state.height);
       
        return (
            <View>
                
            <TextInput
                {...this.props}
                multiline
                style={[
                    {
                        height: this.state.height,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        paddingHorizontal: verticalScale(16),
                        // width: '80%',
                        fontSize: verticalScale(16),
                        flex: 1,
                        marginBottom:verticalScale(20)
                    },
                    titleInputStyle
                ]}
                onChange={onChangeText??this.onTextChange.bind(this)}
                value={initValue??this.state.text}
                placeholder={placeholder ?? 'useless placeholder'}
                placeholderTextColor={placeholderColor ?? colors.grayColor}
                keyboardType={type}
                onContentSizeChange={event => {
                    if (this.state.height <= (35*6)&& event.nativeEvent.contentSize.height>this.state.height){
                        this.setState({
                            height: event.nativeEvent.contentSize.height,
                            // viewHeight: event.nativeEvent.contentSize.height
                        })
                    }
                }}
                />
                </View>
        );
    }
}

export default AutoExpandingTextInput