import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity,I18nManager,Linking,Platform} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text,Picker, Tab, Tabs, Thumbnail, Toast,Spinner} from 'native-base';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "i18next";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import StatusBarPlaceHolder from "../../components/StatusBarPlaceHolder"
export default function SingleScreen({route,navigation}) {
  const {colors} = useTheme();
    const {t} = useTranslation();
    const [normalModal,setNormalModal] = useState(false);
    const [specialModal,setSpecialModal] = useState(false);
    const [currentSpecialEvent,setCurrentSpecialEvent]= useState();
    const [selected,setSelected] = useState('view');
    const [featched,setFeatched] = useState(false);
    const [time, setTime] = useState(new Date());
    const [time2, setTime2] = useState(new Date());
    const [time3, setTime3] = useState(new Date());
    const [fetch,setFetch] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [news,setNews]= useState([]);

    const [persons, setPersons] = useState('1');
    const [kids, setKids] = useState('0');
    const [smoking, setSmoking] = useState('0');
    const [outt, setOutt] = useState('0');


    useEffect(()=>{
        if(route.params.id == 0){
            setNews(JSON.parse(route.params.item));

            setFetch(true);
        }
        else {
          axios.get('http://newsapi.org/v2/everything', {
              params: {
                  q:route.params.search,
                  from:'2021-02-02',
                  sortBy:'publishedAt',
                  apiKey:'738c3e5b4c5547058df089bc18d426a8',
                  pageSize:1,
                  page:1
              }
          })
                .then(function (response) {
                    setNews(response.data.articles[0]);
                    setFetch(true);
// alert('ss')
                })
                .catch(function (error) {
// alert('jj')

                    alert(error);
                });

        }


        // i18n.changeLanguage ('ar');
    },[]);






    if(fetch == true) {
        return (
            <ScrollView>




                            <Image renderToHardwareTextureAndroid source={{
                                uri: news.urlToImage
                            }}
                                   style={{
                                       width: '100%',
                                       height: 250,
                                       resizeMode: 'stretch'
                                   }}/>





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
                    }}
                >
                    <AntDesign name="back" size={24} color="black"/>

                </Button>
                <View renderToHardwareTextureAndroid style={{backgroundColor:colors.background,
                borderRadius:40,
                marginTop:0,
                textAlign:'center',
                alignItems:'center',
                padding:20,
                paddingTop:40,
                height:'100%'}}>


                    <Text style={{
                        fontFamily: 'Poppins-Medium',
                        color: colors.text,
                        fontSize: 28,
                        padding: 5,
                        alignSelf: 'flex-start'
                    }}>{news.title}</Text>




                            <View style={{alignItems: 'center'}}>
                                <Text
                                    style={{fontFamily: 'Poppins-Medium', color: '#CECDCD', fontSize: 15, padding: 20}}>

                                  { news.description}

                                </Text>






                            </View>





                </View>


            </ScrollView>
        )
    }
    else {
        return  (
            <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',top:'50%'}}>
                <Spinner color='#E50000' style={{alignSelf:'center',justifyContent:'center'}}/>
            </View>)
    }

}
const styles = StyleSheet.create({

    container: {


    },
    searchInput:{
        width:'100%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:50,
width:130,
        alignSelf:'center',
        height:40,
        margin:15,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton2: {
        backgroundColor: '#E50000',
        flexDirection:'row',
alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        width:'70%',
        justifyContent:'center',
        height:45,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton3: {
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        width:'20%',
        flex:.2,
        height:44,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },
    button:{
        backgroundColor: '#FFFFFF',
        color: '#ffffff',
        flex: .4,
        marginHorizontal:5,
        borderColor:'#fff',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },


    },
    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,

    },
    modalCancel:{
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,
        marginHorizontal:15,


    },
    components:{
        width:'95%'
    },
    stars:{
        flexDirection:'row',
        margin:15,
        alignSelf:'center'


    },

});
