import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PokemonList from './page/PokemonList';
import DetailsPokemon from './page/DetailsPokemon';
import Connexion from './page/Connexion'
import Inscription from './page/Inscription'
import Favoris from "./page/Favoris";
import Search from "./page/Search";
import { Ionicons } from '@expo/vector-icons';

import firebase from "./config/firebase";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
console.disableYellowBox = true;

function Recherche() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Recherche sur google" component={Search} />
        </Stack.Navigator>

    );
}

function Home() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Liste Pokemon" component={PokemonList} />
            <Stack.Screen name="Details Pokemon" component={DetailsPokemon} />
            <Stack.Screen name="Connexion" component={Connexion} />
            <Stack.Screen name="Inscription" component={Inscription} />
            <Stack.Screen name="Favoris" component={Favoris} />
        </Stack.Navigator>

    );
}

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'List') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    } else if (route.name === 'Recherche') {
                        iconName = focused ? 'ios-search' : 'ios-search'
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
                tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
                >
                <Tab.Screen name="List" component={Home}/>
                <Tab.Screen name="Recherche" component={Recherche} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default  App;