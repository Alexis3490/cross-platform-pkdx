import React, {Component} from 'react';
import {Item, Icon, Container, Header, Input, Content, Footer, Body} from 'native-base';
import {View, FlatList, Dimensions, Text, Image, TouchableOpacity, Button} from "react-native";
import _ from 'lodash'
import styles from '../css/pokemon-liste'
import * as firebase from "firebase";
import Orientation from 'react-native-orientation';


export default class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            query: "",
            login: null,
            pokemon_info: null,
        };
    }

    componentDidMount() {
        this.FetchListePokemon();
        this.signuser();
        this.VerifyFavorit;

    }

    FetchListePokemon = _.debounce(() => {
        return fetch('https://pokeapi.co/api/v2/pokemon?limit=897')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: true,
                    data: responseJson.results,
                    liste_pokemon: responseJson.results,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }, 250)

    handleSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = _.filter(this.state.liste_pokemon, pokemon => {
            if (pokemon.name.includes(formattedQuery)) {
                return true
            }
            return false
        })
        this.setState({data, query: text})
    }

    signuser = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({login: true})
            } else {
                this.setState({login: false})
            }
        });
    }

    redirection = () => {
        if (this.state.login) {
            this.props.navigation.navigate("Favoris")
        } else {
            this.props.navigation.navigate("Connexion")
        }
    }


    render() {
        return (
            <Container style={{flex:1, flexDirection:'column'}}>
                <Header searchBar rounded>
                    <Item>
                        <Input placeholder="Search" onChangeText={this.handleSearch}/>
                    </Item>
                </Header>
                <Content scrollEventThrottle={1000}>
                    <FlatList
                        style={{height: "auto"}}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <View style={{marginTop:10}}>
                                <View style={styles.block_pokemon}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.props.navigation.navigate("Details Pokemon", {
                                            id: item.url.split('/')[6],
                                            name: item.name,
                                            login: this.state.login
                                        })}>

                                        <View style={[styles.block_pokemon, styles.border_image]}>
                                            <Image style={styles.image_pokemon}
                                                   source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(item.url).split('/')[6]}.png`}}/>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={[styles.block_pokemon, styles.border_text]}>
                                        <Text style={styles.text_pokemon}>#{item.url.split('/')[6]}</Text>
                                        <Text style={styles.text_pokemon}>{item.name}</Text>
                                    </View>


                                </View>
                            </View>


                        )}
                    />

                </Content>
                <Footer>
                    {this.state.login ?
                        <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3", borderRadius:2}}>
                            <Button color="white" title="Mon profil" onPress={this.redirection}/>
                        </View>:
                        <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3", borderRadius:2}}>
                            <Button color="white" title="Connexion / Inscription" onPress={this.redirection}/>
                        </View>}
                </Footer>
            </Container>


        );
    }
}