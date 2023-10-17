import React from 'react';
import {Platform, StatusBar} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Navigation from './Navigation';
import * as MyUtil from './constants/MyUtil';

// ##### 리덕스 관련 ######
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './components/redux/rootReducer';

var PushNotification = require('react-native-push-notification');

let store = createStore(rootReducer); // Render the app container component with the provider around it
// ##### 리덕스 관련 END

//경고창 숨김
console.disableYellowBox = true;
let getTxCode = ''; // 포그라운드 노티(onNotification)에서 받은 데이터를 노티 클릭 콜백(onNotificationOpened, PushNotification.configure)으로 넘겨주기 위한 변수

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this._checkPermission();

    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(permissions => {
        console.log(
          'PushNotificationIOS.checkPermissions : ' +
            JSON.stringify(permissions),
        );
      });
    }

    PushNotification.configure({
      onRegister: function (token) {
        console.log(token);
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', JSON.stringify(notification));
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // ********* 앱이 포그라운드일때 노티를 '받으면' 발생되는 이벤트 ********* //
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log(
        '********** NOT 포그라운드 노티 리시브 - json : ',
        JSON.stringify(remoteMessage),
      );
      console.log(
        '********** NOTI 포그라운드 노티 리시브 - title: ' +
          remoteMessage.notification.title +
          ' / body: ' +
          remoteMessage.notification.body +
          ' / tx_code: ' +
          remoteMessage.data.tx_code,
      );

      if (MyUtil.fcmSentTime !== JSON.stringify(remoteMessage.sentTime)) {
        MyUtil.fcmSentTime = JSON.stringify(remoteMessage.sentTime);
        // 전역변수에 저장
        getTxCode = remoteMessage.data.tx_code;
        let bodyText;

        if (typeof remoteMessage.notification.body === 'undefined') {
          bodyText = '';
        } else {
          bodyText = remoteMessage.notification.body;
        }

        PushNotification.localNotification({
          /* Android Only Properties */
          autoCancel: true,
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          visibility: 'private', // (optional) set notification visibility, default: private
          group: 'msg', // (optional) add group to message

          /* iOS and Android properties */
          title: remoteMessage.notification.title, // (optional)
          message: bodyText, // (required)
          userInfo: {id: '001'},
          playSound: true,
        });
      }
    });

    // ********* 앱이 종료 상태에서 노티를 '클릭하면' 콜백 받는 이벤트 ********* //
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            '********** NOTI 앱 종료 백그라운드 노티1 클릭 ',
            JSON.stringify(remoteMessage),
          );
          let txCode = JSON.stringify(remoteMessage.data.tx_code);
        }
      });

    // ********* 앱이 실행중이지만 백그라운드일때 노티를 '클릭하면' 콜백 받는 이벤트 ********* //
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          '********** NOTI 앱 실행 백그라운드 노티1 클릭 ',
          JSON.stringify(remoteMessage),
        );
        let txCode = JSON.stringify(remoteMessage.data.tx_code);
      }
    });
  }

  _checkPermission = async () => {
    messaging()
      .requestPermission()
      .then(() => {
        console.log('*********************** _checkPermission 요청 : 완료');
      })
      .catch(error => {
        console.log(
          '*********************** _checkPermission 에러!!!! : ' + error,
        );
      });
  };

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </Provider>
    );
  }
}
