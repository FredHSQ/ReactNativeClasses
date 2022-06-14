import React from 'react';
import { Image } from 'react-native';

import { Shop } from '../pages/Shop';
import { Skills } from '../pages/Skills';
import { Cart } from '../pages/Cart';

import ShopIcon from '../assets/icons/storefront_FILL0_wght400_GRAD0_opsz48.png'
import SkillsIcon from '../assets/icons/fact_check_FILL0_wght400_GRAD0_opsz48.png'
import CartIcon from '../assets/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.png'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
    Skills: undefined;
    Shop: undefined;
    Cart: undefined;
};

export function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarInactiveBackgroundColor: "#111",
                    tabBarStyle: { backgroundColor: "#111", paddingBottom: 2 },
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: "#aaa",
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                resizeMode="contain"
                                source={SkillsIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        ),
                    }}
                    name="Skills"
                    component={Skills}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                resizeMode="contain"
                                source={ShopIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        ),
                    }}
                    name="Shop"
                    component={Shop}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                resizeMode="contain"
                                source={CartIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        ),
                    }}
                    name="Cart"
                    component={Cart}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

