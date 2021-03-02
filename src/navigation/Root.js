import User from './UserStack';
import { Root } from "native-base";

import {NavigationContainer} from "@react-navigation/native";
import {Text} from  'react-native';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useTranslation} from "react-i18next";
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from "../screens/LoadingScreen";
import SingleScreen from "../screens/User/SingleScreen";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";


const Stack = createStackNavigator();
const linking = {
    prefixes: ['https://news.com', 'news://'],
    config: {
        screens: {
            SingleScreen: 'news/:search',
        },
    },
};
export default function RootNavigation() {
    const { t } = useTranslation();
    const [initial , setIninitial] = useState('Auth');
const scheme = useColorScheme();
        return (
            <Root>
            <AppearanceProvider>
                <NavigationContainer linking={linking} theme={scheme === "dark" ? DarkTheme :DefaultTheme}>
                    <Stack.Navigator  >
                        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false,title:t('Home')}}/>


                        <Stack.Screen name="User" component={User} options={{headerShown:false,title:t('Home')}} initialParams={{search:0}}/>

                        <Stack.Screen name="SingleScreen" component={SingleScreen} options={{headerShown:false,title:t('SingleScreen')}} />





                    </Stack.Navigator>
                </NavigationContainer>
                </AppearanceProvider>
            </Root>

        );
    }
