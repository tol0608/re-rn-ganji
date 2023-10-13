import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Layout from './constants/Layout';
import Colors from './constants/Colors';

import ShowItem from './screens/BuyScreens/ShowItem';
import Cart from './screens/BuyScreens/Cart';

import Intro from './screens/LoginScreens/Intro';
import Login from './screens/LoginScreens/Login';
import Join from './screens/LoginScreens/Join';
import UserInfo from './screens/LoginScreens/UserInfo';

import MainScreen from './screens/MainScreens/MainScreen';

import NotificationList from './screens/NotiScreens/NotificationList';
import NotificationDetail from './screens/NotiScreens/NotificationDetail';
import AlertMsg from './screens/NotiScreens/AlertMsg';

import ReviewList from './screens/ReviewScreens/ReviewList';
import ReviewDetail from './screens/ReviewScreens/ReviewDetail';
import OrderList from './screens/ReviewScreens/OrderList';
import ReviewWrite from './screens/ReviewScreens/ReviewWrite';

const LoginHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.viewTopBar}>
        <View style={styles.viewTopBarRight}>
          <Image
            source={require('./img/logo_1.png')}
            style={{
              width: (Layout.window.width * 1) / 4.5,
              height: '100%',
              marginRight: 10,
              marginTop: 15,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const LoginScreensHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.viewTopBar}>
        <View style={styles.viewTopBarLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('./img/back.png')}
              style={{width: 13, height: 23, marginLeft: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.viewTopBarCenter}>
                    <Text style={{ fontSize: Layout.fsM, color: '#000000' }}>{route.params.topTitle}</Text>
                </View> */}

        <View style={styles.viewTopBarRight}>
          <Image
            source={require('./img/logo_1.png')}
            style={{
              width: (Layout.window.width * 1) / 4.5,
              height: '100%',
              marginRight: 10,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const CommonScreensHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: Colors.shoppingBg}}>
      <View style={styles.viewTopBar}>
        <View style={styles.viewTopBarLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('./img/back.png')}
              style={{width: 13, height: 23, marginLeft: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewTopBarCenter}>
          <Text
            allowFontScaling={false}
            style={{fontSize: Layout.fsL, fontWeight: 'bold', color: 'black'}}>
            {route.params.name}
          </Text>
        </View>

        <View style={styles.viewTopBarRight} />
      </View>
    </SafeAreaView>
  );
};

const ShowItemScreensHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: Colors.shoppingBg}}>
      <View style={styles.viewTopBar}>
        <View style={styles.viewTopBarLeft}>
          {/* <TouchableOpacity onPress={() => { navigation.navigate('MainScreen', { fromPage:"ShowItem" })}}> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainScreen', {fromPage: 'ShowItem'});
            }}>
            <Image
              source={require('./img/back.png')}
              style={{width: 13, height: 23, marginLeft: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewTopBarCenter}>
          <Text
            style={{fontSize: Layout.fsL, fontWeight: 'bold', color: 'black'}}>
            {route.params.name}
          </Text>
        </View>

        <View style={styles.viewTopBarRight}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('./img/Cart.png')}
              style={{
                width: Layout.window.GapLvIX,
                marginRight: 15,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            header: props => <LoginHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="Join"
          component={Join}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            animationEnabled: false,
            header: props => <LoginScreensHeader {...props} />,
          }}
          initialParams={{easy_type: '', uniq_key: ''}}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            header: props => <LoginScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
          }}
          initialParams={{
            od0Drag: 0,
            od1Drag: 0,
            od2Drag: 0,
            od3Drag: 0,
            od4Drag: 0,
            od5Drag: 0,
            od6Drag: 0,
          }}
        />
        <Stack.Screen
          name="NotificationList"
          component={NotificationList}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            title: '공지사항',
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="NotificationDetail"
          component={NotificationDetail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            title: '공지사항',
            animationEnabled: false,
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="AlertMsg"
          component={AlertMsg}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowItem"
          component={ShowItem}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
            //header: props => <ShowItemScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="ReviewList"
          component={ReviewList}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            //title: '구매후기',
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="ReviewDetail"
          component={ReviewDetail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            //title: '구매후기',
            header: props => <CommonScreensHeader {...props} />,
          }}
          initialParams={{review_no: ''}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            //title: '구매후기',
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            //title: '구매후기',
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="ReviewWrite"
          component={ReviewWrite}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            //title: '구매후기',
            header: props => <CommonScreensHeader {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewTopBar: {
    width: '100%',
    height: Layout.window.topBarHeight * 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.shoppingBg,
  },
  viewTopBarLeft: {
    flex: 1,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
  },
  viewTopBarCenter: {
    flex: 6,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTopBarRight: {
    flex: 1,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default Navigator;
