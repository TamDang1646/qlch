import React, { Component } from 'react';

import {
    StyleProp,
    Text,
    TextProps,
    TextStyle,
} from 'react-native';

import { colors } from '../constants/colors';
import { verticalScale } from './Scales';

interface Props extends TextProps {
    title?: any,
    style?: StyleProp<TextStyle>,
    numberOfLines?: any,
}

type State = {

}

class TextBase extends Component<Props, State> {

    render() {
        return (
            <Text
                {...this.props}
                allowFontScaling={false}
                numberOfLines={this.props.numberOfLines}
                style={[{
                    fontSize: verticalScale(15),
                    color: colors.textColor,
                    includeFontPadding: false,
                    // letterSpacing: verticalScale(1) / 2,
                    fontFamily: 'Pattaya-Regular',
                }, this.props.style]}>{this.props.title || ''}{this.props.children}</Text>
        )
    }
}

export default TextBase;