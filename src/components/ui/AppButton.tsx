import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import AppTextBold from './AppTextBold'
import { THEME } from '../../theme'

const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR, textColor = '#fff' }: any) => {
  const Wrapper: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
        <Wrapper onPress={onPress} activeOpacity={0.7}>
            <View style={{...styles.button, backgroundColor: color}}>
              <AppTextBold style={{...styles.text, color: textColor}}>{children}</AppTextBold>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  text: {}
})

export default AppButton;