import React from 'react';

import {
  Image,
  View,
} from 'react-native';

import {images} from '../constants/images';
import {verticalScale} from './Scales';

interface Props {
    star?: any;
}
const maxRating = [1, 2, 3, 4, 5];
export default function Star(props: Props) {
    const { star } = props;
    const defaultRating = star || 0;
    const scaleStar = 20;
    return (
        <View
            style={{
                flexDirection: 'row',
                marginLeft: verticalScale(18),
                marginVertical: verticalScale(5),
            }}>
            {maxRating.map((item, index) => {
                return (
                    <Image
                        key={index}
                        style={{
                            marginRight: verticalScale(8),
                            width: scaleStar,
                            height: scaleStar,
                            resizeMode: 'contain',
                        }}
                        source={
                            item <= defaultRating
                                ? images.yellowStar
                                : images.defaultStar
                        }
                    />
                );
            })}
        </View>
    );
}
