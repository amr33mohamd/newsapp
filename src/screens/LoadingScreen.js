import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Label,
  Toast,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next/index';

export default function LoadingScreen({route, navigation}) {
  const {t} = useTranslation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  useEffect(() => {
    AsyncStorage.getItem('lang').then((lang) => {
      i18n.changeLanguage(lang);
      navigation.navigate('User', {screen: 'Home', search: 0});
    });
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#E50000',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Image
        style={styles.stretch}
        source={require('../Assets/Images/splash.png')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  stretch: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
