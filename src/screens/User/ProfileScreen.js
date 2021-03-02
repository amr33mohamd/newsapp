import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,I18nManager,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast,List,ListItem,Right,Left} from 'native-base';
import RNRestart from 'react-native-restart'; // Import package from node modules
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "i18next/index";
import {useIsFocused} from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

export default function ProfileScreen({navigation}) {
  const {colors} = useTheme();
    const {t} = useTranslation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [points, setPoints] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();
    const isFocused = useIsFocused()
    const [user,setUser] = useState();
    const [errors, setErrors] = useState({});

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            AsyncStorage.getItem('token').then((token) => {
                setToken(token);
            })
            if (token) {

                axios.post('http://makaneapp.com/api/user', null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUser(response.data.user);
                        setName(response.data.user.name);
                        setCode(response.data.user.invite_code)
                        setPoints(response.data.user.points)


                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error))

                        // alert(error.response.data.errors);
                    });

            }
        });
    }, [update,isFocused]);
    var logout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth', {screen: 'Login'});
    }
    var submit = () => {
        AsyncStorage.getItem('token').then((token) => {

            if (name != '') {
                axios.post('http://makaneapp.com/api/update_user', null, {
                    params: {
                        email, password, name
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUpdate(!update);
                        setErrors({});
                        Toast.show({
                            text: 'successfully updated your data',
                            buttonText: 'Okay',
                            type: "success"

                        })
                        // alert(JSON.stringify(response))

                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error.response))
                        setErrors(error.response.data.errors)

                    });
            }
            else {
                Toast.show({
                    text: 'please fill in all data',
                    buttonText: 'Okay',
                    type: "danger"

                })
            }
        })

    }
    var logout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth', {screen: 'Login'});
    }


    return (
        <Container>
            <Content style={{backgroundColor:colors.background,textAlign:'center'}}>



                <View style={{backgroundColor:colors.background,textAlign:'center'}}>
                <ListItem style={{backgroundColor:colors.background,textAlign:'center'}} itemDivider>
                <Text style={{
                    fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
                    fontSize: 19,
                    padding: 10,
                    textAlign: 'center',
                    color:colors.text
                }}>{t('Settings')}</Text>
</ListItem>

                <List>


           <ListItem  button onPress={() => {
               if(i18n.language == 'ar'){
                   AsyncStorage.setItem('lang','en');
                   i18n.changeLanguage ('en');
                   I18nManager.forceRTL(false);

                   RNRestart.Restart();

               }
               else {
                   AsyncStorage.setItem('lang','ar');
                   i18n.changeLanguage ('ar');
                   I18nManager.forceRTL(true);

                   RNRestart.Restart();

               }
// i18n.changeLanguage('en')
           }} >

           <Left>
           <Text style={{
             fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
             fontSize: 13,
             padding: 10,
             textAlign: 'center',
             color:colors.text

           }}>{ (i18n.language == 'ar') ? 'English' : 'Arabic'}</Text>
                        </Left>
             <Right>
<MaterialIcons style={{                    color:colors.text
}} name="g-translate" size={24} color="black" />
            </Right>
           </ListItem>


         </List>
                </View>
            </Content>

        </Container>


    );


}
const styles = StyleSheet.create({

    container: {

    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        margin:10,
        alignSelf:'center'


    },
    button:{
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        margin:10,
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});
