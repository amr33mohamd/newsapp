import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import { Container, Header, Content, Thumbnail, Text } from 'native-base';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import { useTheme } from '@react-navigation/native';

 const NewsBox = (props:any) => {
     const { t } = useTranslation();
     const {colors} = useTheme();
const title:string  = props.title;
const description:string  = props.description;
const author:string  = props.author;

     const  items = [];

return(

    <View style={{
      flexDirection:'row',
          backgroundColor:colors.card,
          shadowOpacity: 1,
          shadowRadius: 5,
          shadowColor: '#fff',
          shadowOffset: { height: 1, width: 1 },
          marginVertical:10,
          borderRadius:10,
          padding:10,
          elevation: 1,
          width:'99%',
          alignSelf:'center',
          borderWidth:1,
          borderColor:colors.border
    }} >
        <View style={styles2.left}>
            <Image  source={{
                uri: props.urlToImage}}
            style={{
                width:'100%',
                height:130,
                resizeMode:'contain'
            }}/>

        </View>
        <View style={styles2.right}>
            <Text style={{fontFamily:'Poppins-Medium',color:colors.text,fontSize:13,padding:5,textAlign:'right',alignSelf:'flex-start'}}>{title}</Text>
            <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:10,padding:5,height:70,alignSelf:'flex-start'}}>{description}</Text>
            <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:12,padding:0,alignSelf:'flex-start'}}>{author}</Text>

        </View>

    </View>
)

}

const styles2 = StyleSheet.create({
container:{


},
    left:{
        flex:.5,
        padding:10
    },
    right:{
        flex:.5,
        padding:5,
    },
    buttom:{
        flexDirection:'row',
        flex:1,
        justifyContent: "center",
        alignItems:'center'

    },
    stars:{
        flexDirection:'row',
        flex:.4,


    }



})
export default NewsBox;
