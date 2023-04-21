import * as React from 'react';

import {SvgXml} from 'react-native-svg';

import {verticalScale} from './Scales';

interface Props {
    xml: string;
    width: number;
    height: number;
}

export default ({ width, height, xml }: Props) => <SvgXml xml={xml} width={verticalScale(width)} height={verticalScale(height)} />;