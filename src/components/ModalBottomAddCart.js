import React from 'react';
import { StyleSheet, View, Platform, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


export default class ModalBottomAddCart extends React.Component {
    render() {
        const { _modalCb, isModalOpen, _modalCbToCart } = this.props;

        return (
            <Modal
                testID={'modal'}
                isVisible={isModalOpen}
                swipeDirection={['down']}
                onSwipeComplete={({ swipingDirection }) => { _modalCb(false, {}) }}
                style={styles.view}
                backdropOpacity={0.3}
                onBackButtonPress={() => { _modalCb(false, {}) }}
                onBackdropPress={() => { _modalCb(false, {}) }}>

                <View style={{ width: Layout.window.width - 40, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                    <View style={{ width: Layout.window.width, alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsL, color: Colors.baseTextGray, marginTop: 20, marginBottom: 15, fontWeight: 'bold' }}>장바구니에 담겼습니다.{"\n"}지금 확인하시겠습니까?</Text>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { _modalCb(false, {}) }} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: Layout.window.GapLvIV }}>
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: Colors.baseTextGray }}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { _modalCbToCart(false, {}) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: Layout.window.GapLvV }}>
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, fontWeight:'bold',color: 'black' }}>확인</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        margin: 0,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 35 : 5
    },
});
