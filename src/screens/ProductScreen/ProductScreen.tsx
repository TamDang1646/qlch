import * as React from 'react';

import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  TabBar,
  TabView,
} from 'react-native-tab-view';

import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import InputBase from '../../components/InputBase';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { images } from '../../constants/images';
import NavigationService from '../../navigation/NavigationService';
import { routes } from '../../navigation/Routes';
import productServices from '../../services/ProductServices';
import {
  getMoneyFormat,
  removeVietnameseTones,
} from '../../utils/Utils';

interface Props {
  navigation: any
}
const ProductScreen = (props: Props) => {
  const key = {
    quan: '0',
    ao: '1',
    giay: '2',
    phukien: '3'
  }
  const [tapRoutes] = React.useState([
    { key: key.quan, title: 'Quần' },
    { key: key.ao, title: 'Áo' },
    { key: key.giay, title: 'Giày-Dép' },
    { key: key.phukien, title: 'Phụ kiện' },
  ]);
  const [index, setIndex] = React.useState<number>(0);
  const [product, setProcduct] = React.useState([]);
  const [quanList, setQuanList] = React.useState([]);
  const [aoList, setAoList] = React.useState([]);
  const [giayList, setGiayList] = React.useState([]);
  const [phukienList, setPhukienList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    void getProduct()
  }, [])
  const getProduct = async () => {
    setLoading(true);
    const res = await productServices.searchProduct({})
    if (!res.errorCode) {
      setProcduct(res.products)
    }
  }
  React.useEffect(() => {

    setQuanList(product?.filter(item => item.type == key.quan) || [])
    setAoList(product?.filter(item => item.type == key.ao) || [])
    setGiayList(product?.filter(item => item.type == key.giay) || [])
    setPhukienList(product?.filter(item => item.type == key.phukien) || [])
    setLoading(false);

  }, [product])
  React.useEffect(() => {
    console.log(loading);

    if (loading) {
      R.Loading.show()
    } else {
      R.Loading.hide()
    }
  }, [loading])
  const _renderIcon = ({ route, focused }: { route: { key: string, title: string }, focused: boolean }) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: focused ? '#FF8500' : 'white',
        // flex: 1,
        width: verticalScale(100),
        height: verticalScale(38),
        borderColor: '#FF8500',
        borderWidth: 1,
        borderRadius: verticalScale(19),
        // margin: verticalScale(8),
        // padding: verticalScale(10),
        marginHorizontal: verticalScale(0),
      }}>
      <TextBase title={route.title} style={{ color: focused ? 'white' : '#FF8500', }} />
    </View>
  );
  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'transparent', }}
        renderLabel={_renderIcon}
        // elevation={0}
        style={{
          backgroundColor: 'transparent',
          // borderBottomWidth: 1.5,
          // borderBottomColor: colors.borderGreyColor,
          alignSelf: 'center',
          // width: verticalScale(),
          height: verticalScale(44),
          margin: verticalScale(8),
          // marginHorizontal: verticalScale(16),
          // borderWidth: 1
        }}
        scrollEnabled
        tabStyle={{ margin: 0, padding: 0, width: verticalScale(110), }}
        pressColor='transparent'

      />
    );
  };
  const renderBills = ({ item }: { item: any }) => {
    return <TouchableOpacity style={styles.prodItem}
      onPress={() => {
        NavigationService.navigate(routes.PRODUCT_DETAIL_SCREEN, { item })
      }}
    >
      <Image source={{ uri: item.image?.split(',')?.[0] }} style={{
        width: '100%',
        height: '60%',
      }} resizeMode='cover' />
      <View style={{ flex: 1, overflow: 'hidden', paddingVertical: verticalScale(4), paddingHorizontal: verticalScale(8) }}>

        <TextBase title={item.name} style={[styles.titleDetail, { fontSize: verticalScale(14) }]} numberOfLines={2} ellipsizeMode='tail' />
        <TextBase title={`${getMoneyFormat(item.price)} VND`} style={styles.titleDetail} />
        <TextBase title={`Size: ${item.size}`} style={styles.titleDetail} />
      </View>
    </TouchableOpacity>
  }
  const _renderItemView = (data: any) => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item: any) => `item-${item.id}`}
          renderItem={renderBills}
          numColumns={2}
          style={{
            // alignItems: 'flex-start',
            margin: verticalScale(16)
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // isRefresh={isRefresh}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getProduct} />
          }
          ListEmptyComponent={() => <TextBase title={'Chưa có mặt hàng phù hợp'} style={{
            fontSize: verticalScale(16),
            alignSelf: 'center',
            marginVertical: verticalScale(40),
            color: colors.grayColor
          }} />}
        />
      </View>
    )
  };
  const layout = useWindowDimensions();
  const _renderTabView = ({ route }: { route: { key: string, title: string } }) => {
    // const { dataTotal, dataBuy, dataSpend } = state;

    switch (route.key) {
      case key.quan:
        return _renderItemView(quanList);
      case key.ao:
        return _renderItemView(aoList);
      case key.giay:
        return _renderItemView(giayList);
      case key.phukien:
        return _renderItemView(phukienList);
      default:
        return null;
    }
  };
  const onChangeSearchText = (txt: string, index: number) => {
    const newDataFillter = product.filter((item: { name: string; type: number }) => {
      const itemData = removeVietnameseTones(item.name).toUpperCase();
      const textData = removeVietnameseTones(txt).toUpperCase();
      return (itemData.indexOf(textData) > -1 && item.type == index);
    }) || [];
    console.log('new search', newDataFillter);
    switch (index) {
      case 0:
        setQuanList(newDataFillter)
        break;
      case 1:
        setAoList(newDataFillter)
        break;
      case 2:
        setGiayList(newDataFillter)
        break;
      case 3:
        setPhukienList(newDataFillter)
        break;
      default:
        break;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={() => onPressMenu()}
                style={styles.menu}>
                <FontAwesomeIcon icon={faHouse} size={verticalScale(50)} />
            </TouchableOpacity>
            <Text>ProductScreen</Text> */}
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-start', margin: verticalScale(16) }}>

        <InputBase
          // titleInput={this.state.jobTypeChosen.length >= 3 ? "Bạn đã chọn tối đa 3 ngành nghề cho phép" : 'Chọn tối đa 3 ngành nghề'}
          // titleInputStyle={{ marginLeft: 0, fontWeight: '400', color: this.state.jobTypeChosen.length >= 3 ? R.colors.warningColor : R.colors.textColor }}
          style={{ width: '85%', marginRight: verticalScale(8), borderWidth: 1, borderRadius: 10, borderColor: colors.borderColor }}
          initValue={''}
          onFocus={() => { }}
          placeholder={'Tìm kiếm mặt hàng'}
          placeholderColor={colors.greyColor}
          type={'NORMAL'}
          onChangeText={txt => onChangeSearchText(txt, index)}
          iconRight={images.icon_search}
          iconRightStyle={{ width: verticalScale(25), height: verticalScale(25) }}
          contentStyle={{ backgroundColor: colors.borderGreyColor }}
          borderColor={colors.borderGreyColor}
        />

        <TouchableOpacity onPress={() => {
          NavigationService.navigate(routes.PRODUCT_EDIT, { item: {} })
        }}
          style={{
            width: verticalScale(22),
            height: verticalScale(22),
            marginRight: verticalScale(16),
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: colors.grayColor
          }}
        >
          <FontAwesomeIcon icon={faAdd} size={24} color={colors.grayColor} />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes: tapRoutes }}
        renderTabBar={_renderTabBar}
        renderScene={_renderTabView}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
      />
    </SafeAreaView>
  );
}
export default ProductScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menu: {
    width: verticalScale(50),
    height: verticalScale(50),
    overflow: 'hidden',
    margin: verticalScale(16)
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGreyColor,
    margin: verticalScale(16)
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: '90%',
    fontSize: verticalScale(16)
  },
  prodItem: {
    backgroundColor: 'white',
    width: verticalScale(150),
    height: verticalScale(200),
    borderRadius: 10,
    margin: verticalScale(16),
    overflow: 'hidden',
    // borderWidth:1,
    borderColor: colors.grayColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 6,
  },
  titleDetail: {
    fontSize: verticalScale(12)
  }
})
// ... other code from the previous section