import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Linking,
  Platform,
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
  Picker,
  Tab,
  Tabs,
  Thumbnail,
  Toast,
  Spinner,
} from 'native-base';
import axios from 'axios/index';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder';
export default function SingleScreen({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [featched, setFeatched] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (route.params.id == 0) {
      setNews(JSON.parse(route.params.item));

      setFetch(true);
    } else {
      axios
        .get('http://newsapi.org/v2/everything', {
          params: {
            q: route.params.search,
            from: '2021-02-02',
            sortBy: 'publishedAt',
            apiKey: '738c3e5b4c5547058df089bc18d426a8',
            pageSize: 1,
            page: 1,
          },
        })
        .then(function (response) {
          setNews(response.data.articles[0]);
          setFetch(true);
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }, []);

  if (fetch == true) {
    return (
      <ScrollView>
        <Image
          renderToHardwareTextureAndroid
          source={{
            uri: news.urlToImage,
          }}
          style={{
            width: '100%',
            height: 250,
            resizeMode: 'stretch',
          }}
        />
        <Button
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            backgroundColor: colors.text,
            top: 30,
            left: 10,
            justifyContent: 'center',
            borderRadius: 130,
          }}>
          <AntDesign name="back" size={24} color="black" />
        </Button>
        <View
          renderToHardwareTextureAndroid
          style={{
            backgroundColor: colors.background,
            borderRadius: 40,
            marginTop: 0,
            textAlign: 'center',
            alignItems: 'center',
            padding: 20,
            paddingTop: 40,
            height: '100%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: colors.text,
              fontSize: 28,
              padding: 5,
              alignSelf: 'flex-start',
            }}>
            {' '}
            {news.title}
          </Text>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#CECDCD',
                fontSize: 15,
                padding: 20,
              }}>
              {news.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          top: '50%',
        }}>
        <Spinner
          color="#E50000"
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  searchInput: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingHorizontal: 30,
    color: '#CECDCD',
    borderColor: '#F5F5F5',
    height: 45,
    fontFamily: 'Poppins-Medium',
    fontSize: 4,
  },
});
