import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

import {colors} from '../constants/colors';
import {verticalScale} from './Scales';
// import EmptyList from './EmptyList';
import BaseText from './TextBase';

const DEVICE_HEIGHT = Dimensions.get('window').height;
interface Props {
    scrollIndex: any,
    data: any,
    renderItem: any,
    onRefreshProp: any,
    isRefresh: any,
    onLoadmoreProp: any,
    isLoadmore: any,
    numColumns: any,
    renderHeaderComponent: any,
    style: any,
    keyExtractor: any,
    horizontal: any,
    renderEmptyComponent: any
}
export default function BaseList(props: Props) {
    const {
        scrollIndex,
        data,
        renderItem,
        onRefreshProp,
        isRefresh,
        onLoadmoreProp,
        isLoadmore,
        numColumns,
        renderHeaderComponent,
        style,
        keyExtractor,
        horizontal,
    } = props;
    const _scrollToIndex = useRef();
    const onScroll = useRef(false);
    useEffect(() => {
        if (_scrollToIndex.current && scrollIndex) {
            _scrollToIndex.current.scrollToIndex({ animated: true, index: 0 });
        }
    }, [scrollIndex]);

    const onRefresh = () => {
        onRefreshProp();
    };

    const renderEmptyComponent = () => {
        return (
            <View style={styles.loadingEmty}>
                {isRefresh ? (
                    <SkypeIndicator color={colors.mainColor} size={30} />
                ) : (
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <BaseText title={'Chưa có dữ liệu'} />
                    </View>
                )}
            </View>
        );
    };

    const renderFooterComponent = () => {
        return (
            <>
                {isLoadmore ? (
                    <View style={{ marginVertical: verticalScale(10) }}>
                        <SkypeIndicator color={colors.mainColor} size={20} />
                    </View>
                ) : (
                    <View style={{ height: verticalScale(25) }} />
                )}
            </>
        );
    };

    const handleLoadMore = () => {
        if (!isLoadmore && onScroll.current) {
            onLoadmoreProp?.();
        }
        onScroll.current = false;
    }

    return (
        <FlatList
            data={data}
            horizontal={horizontal ? horizontal : false}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={(item, index) => keyExtractor ? `${keyExtractor} - ${index}` : `${item.id} - ${index}`}
            style={style}
            ListEmptyComponent={props.renderEmptyComponent ? props.renderEmptyComponent : renderEmptyComponent}
            scrollEventThrottle={16}
            ListFooterComponent={renderFooterComponent}
            extraData={data}
            onMomentumScrollBegin={() => { onScroll.current = true }}
            onScrollBeginDrag={() => { onScroll.current = true }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={Platform.OS === 'android' ? 0.5 : -0.001}
            ListHeaderComponent={renderHeaderComponent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            refreshControl={
                <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
        />
    );
}

BaseList.defaultProps = { isLoadmore: false };
BaseList.defaultProps = { numColumns: 1 };
BaseList.defaultProps = { onLoadmoreProp: () => { } };
BaseList.defaultProps = { onRefreshProp: () => { } };
BaseList.defaultProps = { style: {} };
const styles = StyleSheet.create({
    loadingEmty: {
        height: (DEVICE_HEIGHT * 2) / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
