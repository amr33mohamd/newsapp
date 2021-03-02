import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
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
  Spinner,
} from 'native-base';
import NewsBox from '../../components/NewsBox';
import axios from 'axios/index';
import AsyncStorage from '@react-native-community/async-storage';
import StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder';
import {ImageBackground, Tile, Overlay, Caption, Title} from '@shoutem/ui';
import {useTheme} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import i18n from 'i18next/index';

export default function HomeScreen({route, navigation}) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState('resturant');

  const [SerachType, setSerachType] = useState('top-headlines');
  const [activeIndex, setactiveIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState();
  const [country, setCountry] = useState('us');
  const [featched, setFeatched] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {colors} = useTheme();
  const [page, setPage] = useState('1');
  useEffect(() => {
    // if(route.params.search != 0){
    //     setSearch(search);
    //
    // }
    // alert(JSON.stringify(route.params))

    fetachNews(1);
    // })
  }, [update]);
  var fetachNews = (pageNum) => {
    axios
      .get('http://newsapi.org/v2/' + SerachType, {
        params: {
          q: search,
          from: '2021-02-02',
          sortBy: 'publishedAt',
          apiKey: '738c3e5b4c5547058df089bc18d426a8',
          country,
          pageSize: 4,
          page: pageNum,
        },
      })
      .then(function (response) {
        setFeatched(false);
        setRefreshing(false);

        // alert('ss')
        // alert(JSON.stringify(response))
        let data = currentData.concat(response.data.articles);
        // alert(JSON.stringify(data))
        setCurrentData(data);
      })
      .catch(function (error) {
        alert(JSON.stringify(error.response.data));
      });
  };

  var handleLoadMore = () => {
    setPage(parseInt(page) + 1); // increase page by 1
    fetachNews(page); // method for API call
  };

  var renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.link);
        }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            resizeMode: 'contain',
            height: '100%',
            width: '70%',
            borderRadius: 5,
            height: 100,
            padding: 30,
            marginLeft: 25,
            marginRight: 25,
          }}
        />
      </TouchableOpacity>
    );
  };
  var renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };
  return (
    <Container style={{height: '95%'}}>
      <View
        renderToHardwareTextureAndroid
        style={{
          backgroundColor: colors.background,
          height: '100%',
          textAlign: 'center',
          alignItems: 'center',
        }}>
        <Item
          style={{
            width: '90%',
            borderRadius: 10,
            backgroundColor: colors.card,
            marginTop: 35,
            height: 70,
            alignItems: 'center',
            paddingHorizontal: 30,
            color: colors.text,
            borderColor: '#F5F5F5',
            height: 45,
            fontFamily: 'Poppins-Medium',
            fontSize: 4,
          }}
          rounded>
          <Feather active name="search" size={20} style={{color: '#CECDCD'}} />
          <Input
            placeholder={t('Search')}
            value={search}
            onChangeText={(value) => {
              if (value != '') {
                setSearch(value);
                setSerachType('everything');
                setCountry('');
              } else {
                setSearch(value);
                setCountry('us');
                setSerachType('top-headlines');
              }
            }}
            onSubmitEditing={() => {
              setUpdate(!update);
              setCurrentData([]);
              setFeatched(true);
            }}
            fontFamily="Poppins-ExtraLight"
            fontSize={15}
            placeholderTextColor="#CECDCD"
          />
        </Item>

        {featched == false ? (
          <FlatList
            onEndReachedThreshold={0.8}
            style={styles.components}
            data={currentData}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setCurrentData([]);
                  fetachNews('1');
                }}
                tintColor="red"
              />
            }
            ListEmptyComponent={() => (
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                Comming soon
              </Text>
            )}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SingleScreen', {
                    item: JSON.stringify(item),
                    id: 0,
                  });
                }}
                activeOpacity={0.95}>
                <NewsBox
                  title={item.title}
                  description={item.description}
                  urlToImage={item.urlToImage}
                />
              </TouchableOpacity>
            )}
            alwaysBounce={true}
            alwaysBounceVertical={true}
            onEndReached={handleLoadMore}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Spinner color="#E50000" />
        )}
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {},
  searchInput: {},
  buttons: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  selectedButton: {
    backgroundColor: '#E50000',
    flex: 0.4,
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 5,

    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: '#E50000',
    shadowOffset: {height: 0, width: 0},
  },
  button: {
    backgroundColor: '#FFFFFF',
    color: '#ffffff',
    flex: 0.4,
    marginHorizontal: 5,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
  },
  components: {
    width: '90%',
  },
  child: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
