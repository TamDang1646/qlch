import React from 'react';

import {ViewStyle} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import iconMoonConfig from '../../assets/fonts/selection.json';

const IconVector = createIconSetFromIcoMoon(iconMoonConfig);

const Icon = (props: Props) => {
    return (
        <IconVector
            {...props}
        />
    );
};

interface Props {
    name: string;
    size?: number;
    color?: string;
    style?: ViewStyle;
}

export default React.memo(Icon);
