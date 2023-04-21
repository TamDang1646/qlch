import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import { colors } from '../constants/colors';
import userService from '../services/UserService';
import { checkPermission } from '../utils/Utils';
import BaseButton from './BaseButton';
import R from './R';
import { verticalScale } from './Scales';
import TextBase from './TextBase';

const DEVICE_WIDTH = Dimensions.get('window').width;

class BaseUploadImage extends Component {
  static propTypes = {
    children: PropTypes.any,
    data: PropTypes.array,
    onRef: PropTypes.any,
    cropperCircleOverlay: PropTypes.bool,
    cropping: PropTypes.bool,
    multiSelect: PropTypes.bool,
    notUpload: PropTypes.bool,
  };
  static defaultProps = {
    onRef: undefined,
    cropperCircleOverlay: false,
    cropping: true,
    multiSelect: false,
    notUpload: false,
  };
  constructor(props) {
    super(props);
    WIDTH_CUSTOM = DEVICE_WIDTH;
    this.sheetRef = React.createRef();
    this.state = {
      imageUri: undefined,
      isVisible: false,
      dataOptions: [

        // {
        //   key: 'camera',
        //   label: 'Chụp ảnh mới',
        // },
        {
          key: 'library',
          label: 'Chọn từ thư viện',
        },
      ],
    };
  }
  componentDidMount() {
    if (this.props.onRef != undefined) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef != undefined) {
      this.props.onRef(undefined);
    }
  }

  // showOpenSetting = (permission = '') => {
  //   if (Platform.OS === 'android') {
  //     Alert.alert({
  //       title: strings('PostJob.thongbao'),
  //       message: strings('OthepermissionRequest'),
  //       leftButton: {
  //         text: strings('PostJob.huybo')
  //       },
  //       rightButton: {
  //         text: strings('PostJob.dongy'),
  //         onPress: () => Linking.openSettings()
  //       }
  //     })
  //   } else {
  //     Alert.alert({
  //       title: strings('PostJob.thongbao'),
  //       message: strings('Permission.deny').replace('[permission]', permission),
  //       leftButton: {
  //         text: strings('PostJob.dongy'),
  //       },
  //     })
  //   }
  // }

  async onPressImagePicker(item) {
    if (item.key == 'library') {
      const permission = await checkPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
      if (permission === RESULTS.GRANTED || permission === 'limited') {
        if (!this.props.multiSelect) {
          void ImagePicker.openPicker({
            // width: 300,
            // height: 300,
            cropping: this.props.cropping,
            cropperCircleOverlay: this.props.cropperCircleOverlay,
            // includeBase64: true
            // compressImageQuality: 0.75,
          }).then(async image => {
            // console.log("image", image);
            this.setState({ isVisible: false });
            R.Loading.show()
            const fileName = image.filename || image.path.split('/').reverse()[0];
            let result = await userService.uploadFile(image);
            console.log('result', result);

            if (result?.data && result?.success) {
              this.props.imgUri(result.data?.media, Platform.OS === 'ios' ? image.path || image.sourceURL : image.path);
            } else {
              showMessage({
                message: 'Upload failed!',
                type: 'danger',
                icon: 'danger',
                autoHide: true
              })
            }
            R.Loading.hide()
          });
        } else {
          // this.onCloseModal(this.showOpenSetting);
          void ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: this.props.cropping,
            cropperCircleOverlay: this.props.cropperCircleOverlay,
            multiple: true
            // compressImageQuality: 0.75,
          }).then(async image => {
            console.log('image1111', image);
            // this.setState({ isVisible: false });
            // const fileName = image?.filename || image?.path.split('/').reverse()[0];
            // // this.props.imgUri(Platform.OS === 'ios' ? image.path || image.sourceURL : image.path, fileName, image.mime);
            // // let result = await userService.uploadFile(image);
            // let result = await userService.uploadFile2(image.path, fileName, image.mime);

            // console.log('result',result);

            // if (result.linkUrl) {
            //   this.props.imgUri(result.linkUrl, Platform.OS === "ios" ? image.path || image.sourceURL : image.path);
            // } else {
            //   showMessage({
            //     message: "Upload failed",
            //     type: "danger",
            //     icon: "danger",
            //     autoHide: true
            //   })
            // }
          });
        }
      } else {
        // alertNotPermission("Photo Library");
        console.log('Not Permission');

      }
    } else if (item.key == 'camera') {
      const permission = await checkPermission(
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.IOS.CAMERA,
      );
      // console.log(
      //   "BaseUploadImage -> onPressImagePicker -> permission",
      //   permission,
      // );
      if (permission === RESULTS.GRANTED) {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          includeExif: true,
          mediaType: 'photo',
          // cropperCircleOverlay: true,
          // compressImageMaxWidth: 640,
          // compressImageMaxHeight: 480,
          // compressImageQuality: 1,
          // compressImageQuality: 0.75,
        })
          .then(async image => {
            console.log('image2222', image);
            this.setState({ isVisible: false });
            const fileName = image.filename || image.path?.split('/').reverse()[0];
            if (!this.props.multiSelect) {

              let result = await userService.uploadFile2(image.path, fileName, image.mime);
              if (result.linkUrl) {
                this.props.imgUri(result.linkUrl, Platform.OS === 'ios' ? image.path || image.sourceURL : image.path);
              } else {
                showMessage({
                  message: 'Upload failed!',
                  type: 'danger',
                  icon: 'danger',
                  autoHide: true
                })
              }
            }
            else {
              this.props.imgUri(Platform.OS === 'ios' ? image.path || image.sourceURL : image.path, fileName, image.mime);
            }
          })
          .catch(e => {
            console.log('eror', e);
          });
      } else {

        // alertNotPermission("Camera");
      }
    } else if (item.key == 'view') {
      this.onCloseModal();
    }
  }
  listObject = (item, index) => {
    if (item.label) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            void this.onPressImagePicker(item);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: verticalScale(50),
            borderBottomColor: colors.borderGreyColor,
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: verticalScale(10),
          }}
        >
          <TextBase title={item.label} style={{ fontSize: verticalScale(16), flex: 3, color: colors.textColor, textAlign: 'center' }} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  onCloseModal = onClose => {
    this.setState({ isVisible: false }, () => {
      onClose?.()
    });
  };

  onOpenModal = () => {
    this.setState({ isVisible: true });
  };
  render = () => {
    return (
      <Modal
        animationIn={'fadeInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        backdropTransitionOutTiming={1000}
        backdropTransitionInTiming={1000}
        isVisible={this.state.isVisible}
        style={{ margin: 0, justifyContent: 'flex-end' }}
        onBackdropPress={() => this.onCloseModal()}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: verticalScale(10),
            borderTopLeftRadius: verticalScale(10),
            borderTopRightRadius: verticalScale(10),
            height: verticalScale(200),
          }}
        >
          <ScrollView style={{ backgroundColor: colors.containerBg, borderRadius: verticalScale(10), }}>
            {this.props.data
              ? this.props.data.map(this.listObject)
              : this.state.dataOptions.map(this.listObject)}
          </ScrollView>

          <BaseButton
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: verticalScale(20),
              backgroundColor: colors.containerBg,
              width: DEVICE_WIDTH - verticalScale(16)

              // borderWidth: 3
            }}
            contentStyle={
              this.props.buttonStyle
                ? this.props.buttonStyle
                : {
                  height: verticalScale(50),
                  backgroundColor: 'white',
                  // width: DEVICE_WIDTH - verticalScale(16)
                }
            }
            title={this.props.buttonText}
            titleStyle={{
              color: colors.mainColor,
              fontSize: verticalScale(16),
              fontWeight: 'normal',
            }}
            onPress={() => {
              this.setState({ isVisible: false });
            }}
          />
        </View>
      </Modal>
    );
  };
}
export default BaseUploadImage;
