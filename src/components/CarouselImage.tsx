// import * as React from 'react';
import React from 'react';

import {View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {verticalScale} from './Scales';

interface Props {
    data?: any;
    renderItem?: any;
    width?: number;
    height?: number;
    mode?: any;
    snapDirection?: any;
    pagingEnabled?: boolean;
    snapEnabled?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    autoPlayReverse?: boolean;
    viewCount?: number;
}
function CarouselImage(props: Props) {
    const { data = [],
        width = verticalScale(380),
        height = verticalScale(210),
        mode = 'horizontal-stack',
        snapDirection = 'left',
        pagingEnabled = true,
        snapEnabled = true,
        loop = true,
        autoPlay = true,
        autoPlayReverse = false,
        viewCount = 5
    } = props;
    return (
        <View style={{}}>
            <Carousel
                style={{
                    // width: '100%',
                    // height: 240,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginBottom: verticalScale(20)
                    // borderWidth: 1
                }}
                width={width}
                height={height}
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                mode={mode}
                loop={loop}
                autoPlay={autoPlay}
                autoPlayReverse={autoPlayReverse}
                data={data}
                modeConfig={{
                    snapDirection,
                    stackInterval: mode === 'vertical-stack' ? 8 : 18,
                }}
                customConfig={() => ({ type: 'positive', viewCount })}
                renderItem={props.renderItem}
                autoPlayInterval={4000}
            />
        </View>
    );
}

export default CarouselImage;
