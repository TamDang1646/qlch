import React, {Component} from 'react';

import _ from 'lodash';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../constants/colors';
import {verticalScale} from './Scales';
import TextBase from './TextBase';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface Props extends TouchableOpacityProps {
    title?: string,
    titleStyle?: TextStyle,
    contentStyle?: ViewStyle,
    style?: ViewStyle,
    onPress?: () => void,
    sourceImg?: ImageSourcePropType,
    styleImg?: ImageStyle,
    disable?: boolean;
}

type State = {

}

class Button extends Component<Props, State> {
    onPressDebounce: any;
    constructor(props: Props) {
        super(props)
        this.onPressDebounce = _.throttle(this.onPressButton, 2000, { trailing: false })
    }

    onPressButton = () => {
        this.props.onPress?.()
    }
    render() {

        return (
            <TouchableOpacity
                onPress={this.onPressDebounce}
                style={[{
                    marginVertical: verticalScale(30),
                    backgroundColor: colors.greenColor,
                    borderRadius: verticalScale(10),
                    overflow: 'hidden',
                }, this.props.style]}
                disabled={this.props.disable ? this.props.disable : false}
            >
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'hidden',
                    paddingVertical: verticalScale(10),
                    justifyContent: 'center',
                    borderRadius: verticalScale(10),
                    height: verticalScale(50),
                    width: DEVICE_WIDTH - verticalScale(40)
                }, this.props.contentStyle]}>
                    {this.props.title && <TextBase style={[{
                        fontSize: verticalScale(15.5),
                        color: '#fff',
                    }, this.props.titleStyle]} title={this.props.title} />}
                    {this.props.sourceImg ? <Image source={this.props.sourceImg} style={[{ width: verticalScale(10), height: verticalScale(10), resizeMode: 'contain', marginLeft: verticalScale(20) }, this.props.styleImg]}></Image> : null}
                </View>
            </TouchableOpacity>
        )
    }
}

export default Button;