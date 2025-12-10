import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function uc() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/images/comingsoon.jpg')} // add your image inside assets folder
        resizeMode="contain"
        style={{ width: width, height: height }}
      />
    </View>
  );
}