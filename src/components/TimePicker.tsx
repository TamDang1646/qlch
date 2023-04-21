import React, { PureComponent } from 'react';

import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Picker from 'react-native-picker';

const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface Props {
  title1?: string;
  title2?: string;
  title3?: string;
  pickerConfirmBtnText?: string;
  pickerCancelBtnText?: string;
  pickerTitleText?: string;
  fulltime?: boolean;
  notHour?: Boolean;
  miloTime?: Boolean;
  fromTitle?: string;
  toTitle?: string;
  min1?: number;
  max1?: number;
  min2?: number;
  max2?: number;
  min3?: number;
  max3?: number;
  reverse?: boolean,
  pickerBg: any[],
  pickerFontColor: any[],
  pickerToolBarBg: any[],
  pickerFontSize: any,
  pickerTitleColor: any[]
}

interface States {
  visible: boolean
}

type TimePickerProps = typeof TimePicker.defaultProps;

class TimePicker extends PureComponent<TimePickerProps, States> {
  opacity: Animated.Value;
  picker: any[][];
  _dataPicker: any;
  static defaultProps: Props = {
    title1: 'hours',
    title2: '',
    title3: '',
    pickerConfirmBtnText: 'Confirm',
    pickerCancelBtnText: 'Cancel',
    pickerTitleText: 'Select time',
    pickerBg: [255, 255, 255, 1],
    pickerFontColor: [0, 0, 0, 1],
    pickerToolBarBg: [255, 255, 255, 1],
    pickerFontSize: isIOS ? 18 : 15,
    pickerTitleColor: [0, 0, 0, 1],
    fulltime: false,
    notHour: false,
    miloTime: false,
    fromTitle: 'From',
    toTitle: 'To',
    min1: 0,
    max1: 23,
    min2: undefined,
    max2: undefined,
    min3: undefined,
    max3: undefined
  }
  reverse: boolean | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false
    };
    this.opacity = new Animated.Value(0);

    this.picker = [[], [], [], [], [], []];

    this.reverse = props.reverse || false;

    if (props.min3 !== undefined && props.max3 !== undefined) {
      for (let i = props.min3; i < props.max3 + 1; i++) {
        if (props.reverse) {
          this.picker[5].push(i);
        } else {
          this.picker[4].push(i);
        }
      }
      if (props.reverse) {
        this.picker[4].push(props.title3);
      } else {
        this.picker[5].push(props.title3);
      }

      if (props.min1 !== undefined && props.max1 !== undefined) {
        for (let i = props.min1; i < props.max1 + 1; i++) {
          if (props.reverse) {
            this.picker[1].push(i);
          } else {
            this.picker[0].push(i);
          }
        }
        if (props.reverse) {
          this.picker[0].push(props.title1);
        } else {
          this.picker[1].push(props.title1);
        }
      }
      if (props.min2 !== undefined && props.max2 !== undefined) {
        for (let i = props.min2; i < props.max2 + 1; i++) {
          if (props.reverse) {
            this.picker[3].push(i);
          } else {
            this.picker[2].push(i);
          }
        }
        if (props.reverse) {
          this.picker[2].push(props.title2);
        } else {
          this.picker[3].push(props.title2);
        }
      }
    } else {
      if (props.min2 !== undefined && props.max2 !== undefined) {
        this.picker[0].push('');
        if (props.min1 !== undefined && props.max1 !== undefined) {
          for (let i = props.min1; i < props.max1 + 1; i++) {
            if (props.reverse) {
              this.picker[2].push(i);
            } else {
              this.picker[1].push(i);
            }
          }
          if (props.reverse) {
            this.picker[1].push(props.title1);
          } else {
            this.picker[2].push(props.title1);
          }
        }
        for (let i = props.min2; i < props.max2 + 1; i++) {
          if (props.reverse) {
            this.picker[4].push(i);
          } else {
            this.picker[3].push(i);
          }
        }
        if (props.reverse) {
          this.picker[3].push(props.title2);
        } else {
          this.picker[4].push(props.title2);
        }
        this.picker[5].push('');
      } else {
        if (props.min1 !== undefined && props.max1 !== undefined) {
          for (let i = props.min1; i < props.max1 + 1; i++) {
            if (props.reverse) {
              this.picker[1].push(i);
            } else {
              this.picker[0].push(i);
            }
          }
          if (props.reverse) {
            this.picker[0].push(props.title1);
          } else {
            this.picker[1].push(props.title1);
          }
          delete this.picker[2];
          delete this.picker[3];
          delete this.picker[4];
          delete this.picker[5];
        }
      }
    }
  }

  selectTime = ({ fromHour, toHour, onConfirm }: any) => {
    this.setState({
      visible: true
    }, () => {
      Animated.timing(this.opacity, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true
      }).start();
    });
  }

  show = ({ current1, current2, current3, onConfirm }: any) => {
    this._dataPicker = { current1, current2, current3, onConfirm };

    this.setState({
      visible: true
    }, () => {
      Animated.timing(this.opacity, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true
      }).start();
    });
  }

  showTimePicker = () => {
    const { current1, current2, current3, onConfirm } = this._dataPicker;
    const {
      title1,
      title2,
      title3,
      pickerConfirmBtnText,
      pickerCancelBtnText,
      pickerTitleText,
      pickerBg,
      pickerFontColor,
      pickerToolBarBg,
      pickerFontSize,
      pickerTitleColor,
    } = this.props;
    let select = this.reverse ? [
      title1,
      current1,
      title2,
      current2,
      title3,
      current3,
    ] : [
      current1,
      title1,
      current2,
      title2,
      current3,
      title3
    ];

    if (current3 == undefined && current2 != undefined) {
      if (this.reverse) {
        select = [
          '',
          title1,
          current1,
          title2,
          current2,
          ''
        ]
      } else {
        select = [
          '',
          current1,
          title1,
          current2,
          title2,
          ''
        ]
      }
    }

    if (current3 == undefined && current2 == undefined) {
      delete select[2];
      delete select[3];
      delete select[4];
      delete select[5];
    }

    Picker.init({
      pickerData: this.picker.filter((i: any) => i != undefined),
      pickerTextEllipsisLen: 8,
      selectedValue: select,
      pickerConfirmBtnText,
      pickerCancelBtnText,
      pickerTitleText,
      pickerBg,
      pickerFontColor,
      pickerToolBarBg,
      pickerFontSize,
      pickerTitleColor,
      pickerFontFamily: 'Quicksand',
      isLoop: isIOS,
      wheelFlex: isIOS ? [1, 1, 1] : undefined,
      onPickerConfirm: (data: any) => this.onPickerConfirm(data, onConfirm),
      onPickerCancel: this.onPickerCancel
    });
    Picker.show();
  }

  onPickerConfirm = (data: any, onConfirm: any) => {
    onConfirm && onConfirm(data);
    this.onPickerCancel();
  }

  onPickerCancel = () => {
    Animated.timing(this.opacity, {
      duration: 50,
      toValue: 0,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        visible: false
      });
    });
  }

  hide = () => {
    Picker.hide();
    Animated.timing(this.opacity, {
      duration: 50,
      toValue: 0,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        visible: false
      });
    });
  }

  onRequestClose = () => {

  }

  render() {
    const { visible } = this.state;

    return (
      <Modal transparent visible={visible} animationType="none" onRequestClose={this.onRequestClose} onShow={this.showTimePicker}>
        <TouchableWithoutFeedback style={{ zIndex: 0 }} onPress={this.hide}>
          <Animated.View
            style={{
              flex: 1,
              zIndex: -1,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              opacity: this.opacity
            }}
          />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default TimePicker;