import * as React from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Svg, {
  Circle,
  G,
} from 'react-native-svg';

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
interface Props {
    percentage: number,
    radius?: number,
    strokeWidth?: number,
    duration?: number,
    color?: string,
    delay?: number,
    textColor?: string,
    max?: number,
    title?: string,
}
export default function Donut(props: Props) {
    const {
        percentage = 75,
        radius = 40,
        strokeWidth = 10,
        duration = 500,
        color = 'tomato',
        delay = 1000,
        textColor = '#000000',
        max = 100,
        title,
    } = props;
    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef<any>();
    const inputRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    const animation = (toValue: number) => {
        return Animated.timing(animated, {
            delay: delay,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start(() => {
            animation(percentage);
        });
    };

    React.useEffect(() => {
        animation(percentage);
        animated.addListener(v => {
            const maxPerc = 100 * v.value / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${v.value.toFixed(1)}`,
                });
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            animated.removeAllListeners();
        };
    });

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".1"
                    />
                </G>
            </Svg>
            <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color },
                    styles.text,
                ]}
            />
            {title ? <AnimatedTextInput
                // ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="User"
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 3 * 2, color: textColor ?? color },
                    styles.text, { bottom: -100 }
                ]}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    text: { fontWeight: '900', textAlign: 'center' },
});
