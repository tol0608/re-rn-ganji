import React, {useState, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import Config from '../../constants/Config';

const Join = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const [reg_num, setRegNum] = useState(/[0-9]/);
  const [reg_eng, setRegEng] = useState(/[a-zA-Z]/);
  const [reg_spc, setRegSpc] = useState(/[~!@#$%^&*()_+|<>?:{}]/);
  const [reg_kor, setRegKor] = useState(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

  const [name, setname] = useState(false);
  const [handphone, sethandphone] = useState('');
  const [easy_type, seteasy_type] = useState(route.params.easy_type);
  const [uniq_key, setuniq_key] = useState(route.params.uniq_key);
  const [easy_yn, seteasy_yn] = useState(route.params.easy_yn);
  const [email, setemail] = useState(false);
  const [password, setpassword] = useState(false);

  const [passwordchk, setpasswordchk] = useState(false);
  const [idchkConfirm, setidchkConfirm] = useState(false); //100 : 가능, 200 : 이미 가입, 300 : 실패

  const CheckId = useCallback(async email => {
    // if (reg_num.test(email) && reg_eng.test(email) && !reg_spc.test(email) &&!reg_kor.test(email)) {
    if (email == '') {
      Alert.alert('', '아이디를 입력해주세요.');
      setidchkConfirm(300);
    } else if (email != '') {
      const result = await ServerApi._appemailcheck(email);
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        Alert.alert('', '가입 가능한 아이디 입니다.');
        setidchkConfirm(100);
      } else if (result.DATA_RESULT.rsp_code === '200') {
        Alert.alert('', '이미 가입된 아이디 입니다.');
        setidchkConfirm(200);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
            result.DATA_RESULT.rsp_code,
        );
        setidchkConfirm(300);
      }
    }
    // } else {
    //     if (email == '') {
    //         Alert.alert("", "아이디를 입력해주세요.")
    //         setidchkConfirm(300)
    //     }else{
    //         Alert.alert("", "아이디는 영문/숫자로 입력해주세요.")
    //         setidchkConfirm(400)
    //     }
    // }
  }, []);

  const JoinEmailProcess = useCallback(
    async (
      name,
      handphone,
      easyType,
      uniqKey,
      easyYn,
      email,
      password,
      passwordchk,
      idchkConfirm,
    ) => {
      if (idchkConfirm == 100) {
        if (password == passwordchk) {
          const result = await ServerApi._appJoin(
            name,
            String(handphone),
            easyType,
            uniqKey,
            email,
            String(password),
          );

          if (
            result.IS_SUCCESS === true &&
            result.DATA_RESULT.rsp_code === '100'
          ) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, {
              userId: email,
              userPw: String(password),
              easyYn,
              easyType,
              uniqKey,
            });

            Alert.alert('', '가입이 완료되었습니다!');
            navigation.navigate('Login');
          } else if (result.DATA_RESULT.rsp_code === '200') {
            Alert.alert('', '이미 가입된 아이디입니다.');
            setidchkConfirm(200);
          } else {
            Alert.alert(
              '',
              '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
                result.DATA_RESULT.rsp_code,
            );
          }
        } else {
          Alert.alert('', '패스워드가 일치하지 않습니다.');
        }
      } else if (idchkConfirm == 200) {
        Alert.alert('', '이미 가입된 아이디 입니다.');
      } else if (idchkConfirm == 400) {
        Alert.alert('', '아이디는 영문/숫자로 입력해주세요.');
      } else if (idchkConfirm == 300) {
        Alert.alert(
          '',
          '네트워크 환경에 문제가 있었습니다.\n다시한번 중복확인 해주세요.',
        );
      } else {
        Alert.alert('', '아이디 중복확인을 해주세요.');
      }
    },
    [],
  );

  return (
    <SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{backgroundColor: Colors.shoppingBg}}>
          <View style={{width: Layout.window.width, justifyContent: 'center'}}>
            <View
              style={{
                paddingLeft: Layout.window.GapLvV,
                justifyContent: 'center',
                marginTop: Layout.window.GapLvV,
                marginBottom: Layout.window.GapLvV,
              }}>
              <Text allowFontScaling={false} style={styles.txtBigLogin}>
                Join
              </Text>
            </View>

            <View
              style={{
                paddingLeft: Layout.window.GapLvVI,
                paddingRight: Layout.window.GapLvVI,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtJoin}>
                    고객 성함
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtJoinInput}
                    autoCapitalize="none"
                    placeholder={'이름을 입력해주세요'}
                    onChangeText={text => setname(text.trim())}
                  />
                </View>
                <View
                  style={{
                    flex: 5,
                    flexDirection: 'row',
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <View style={{flex: 6}}>
                    <Text allowFontScaling={false} style={styles.txtJoin}>
                      아이디
                    </Text>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtJoinInput}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder={'아이디를 입력해주세요'}
                      onChangeText={text => setemail(text.trim())}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        CheckId(email);
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={styles.txtCheckSame}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtJoin}>
                    비밀번호
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtJoinInput}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholder={'비밀번호를 입력해주세요'}
                    onChangeText={text => setpassword(text.trim())}
                  />
                </View>
                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtJoin}>
                    비밀번호 확인
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtJoinInput}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholder={'비밀번호를 다시 입력해주세요'}
                    onChangeText={text => setpasswordchk(text)}
                  />
                </View>
                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtJoin}>
                    휴대폰 번호
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtJoinInput}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    placeholder={"'-' 제외한 숫자만 입력해주세요"}
                    onChangeText={text => sethandphone(text)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Layout.window.GapLvII,
              }}>
              <TouchableOpacity
                style={{
                  width: (Layout.window.width * 9) / 10,
                  height: (Layout.window.width * 9) / 10 / 4.7,
                }}
                onPress={() => {
                  JoinEmailProcess(
                    name,
                    handphone,
                    easy_type,
                    uniq_key,
                    easy_yn,
                    email,
                    password,
                    passwordchk,
                    idchkConfirm,
                  );
                }}>
                <ImageBackground
                  source={require('../../img/btn_red.png')}
                  style={{height: '100%', width: '100%', position: 'absolute'}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: (Layout.window.width * 9) / 350,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                    가입 완료
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginBox: {
    width: 220,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tiEmailBox: {
    width: 250,
    height: 48,
    backgroundColor: Colors.inputtextBg,
    color: Colors.defaultText,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: Colors.inputtextEmail,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  txtNewAc: {
    fontSize: Layout.fsM,
    marginTop: 40,
    color: Colors.baseTextGray,
    textDecorationLine: 'underline',
  },
  txtJoin: {
    fontSize: Layout.fsM,
    color: 'black',
    fontWeight: 'bold',
    //color: Colors.baseTextGray,
    paddingTop: 10,
    marginLeft: 20,
  },
  txtJoinInput: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    paddingTop: -10,
    marginLeft: 20,
    height: 34,
  },
  txtBigLogin: {
    fontSize: Layout.fsXXXXL,
    color: Colors.defaultText,
    fontWeight: 'bold',
  },
  txtLoginBtn: {
    fontSize: Layout.fsM,
    color: 'white',
    fontWeight: 'bold',
  },
  txtCheckSame: {
    fontSize: Layout.fsM,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
  },
});

export default Join;
