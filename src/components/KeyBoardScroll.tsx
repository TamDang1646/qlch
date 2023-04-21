import React from 'react';

import {
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

interface Props extends KeyboardAwareScrollViewProps {
  style: any;
  children: React.ReactElement;
}

const KeyBoardScroll = ({ style, children, ...otherProps }: Props) => {
  return Platform.OS == 'ios' ? (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      keyboardShouldPersistTaps="never"
      keyboardDismissMode="none"
      // keyboardDismissMode="none"
      contentContainerStyle={{ flexGrow: 1 }}
      enableResetScrollToCoords={true}
      enableOnAndroid={true}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
      <View style={style}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  ) : (
    <ScrollView style={style} keyboardShouldPersistTaps="never" keyboardDismissMode="none">
      {children}
    </ScrollView>
  );
};

export default KeyBoardScroll;
