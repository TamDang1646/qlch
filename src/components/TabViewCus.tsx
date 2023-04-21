import * as React from 'react';

import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SceneMap,
  TabView,
} from 'react-native-tab-view';

interface TabViewProps {
    routes: any;
    tabviews: any;
}
interface TabViewStates {
    index: number;
    routes: any;
}
const FirstRoute = () => (
    <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);
export default class TabViewExample extends React.Component<TabViewProps, TabViewStates> {
    constructor(props: TabViewProps) {
        super(props);
        this.state = {
            index: 0,
            routes: this.props?.routes ?? [],
        }
    }

    _handleIndexChange = (index: number) => this.setState({ index });

    _renderTabBar = (props: any) => {
        const inputRange = this.state.routes.map((x: any, i: any) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route: { title: string | number | boolean | Animated.Value | Animated.AnimatedInterpolation<string | number> | Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> | Animated.WithAnimatedObject<React.ReactFragment> | Animated.WithAnimatedObject<React.ReactPortal> | null | undefined; }, i: any) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex: any) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    // _renderScene = SceneMap(this.props.tabviews);
    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});