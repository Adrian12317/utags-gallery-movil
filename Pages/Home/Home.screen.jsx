import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Posts from '../Posts';
import Profile from '../Profile';
import LogOut from '../Logout';
import i18n from "../../localization/i18n"


const Tab = createBottomTabNavigator();

export default function HomePage() {
  const [photos,setPhotos] = useState([])

  return (
    <>
      <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
         if (route.name === i18n.t("TABS").TABS_POSTS) {
            iconName = focused ?
            "ios-list-sharp"
            :
            "ios-list-outline";
          }else if (route.name === i18n.t("TABS").TABS_PROFILE) {
            iconName = focused ?
            "ios-person-sharp"
            :
            "ios-person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: "#cf8538",
        tabBarInactiveTintColor :"grey",
      })}
      >


        <Tab.Screen name={i18n.t("TABS").TABS_POSTS}
         options={{
          headerRight: () => (
            <LogOut  />
          ),
        }}
        >
        {(props) => <Posts{...props} />}

        </Tab.Screen>


        <Tab.Screen name={i18n.t("TABS").TABS_PROFILE}
         options={{
          headerRight: () => (
            <LogOut  />
          ),
        }}
        >
        {(props) => <Profile{...props} />}
        
        </Tab.Screen>

      </Tab.Navigator>
    </>
  );
}
