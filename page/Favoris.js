import React, {Component} from 'react';
import {Container, Content, Body, Thumbnail, Header} from 'native-base';
import {View, FlatList, Button, Text, TouchableOpacity, Image} from "react-native";
import * as firebase from "firebase";
import _ from 'lodash';
import styles from "../css/pokemon-liste";


export default class Favoris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: null,
            pokemon: ''
        };
    }

    componentDidMount() {
        this.showFavorit();
    }

    signOut = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.auth().signOut();
                this.props.navigation.goBack("Liste Pokemon")
            }
        });
    };

    showFavorit = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).once('value', (data) => {
            const pokemon = _.map(data.val(), (poke) => {
                return {poke}
            });
            this.setState({pokemon: pokemon})
        });


    }

    render() {
        console.log(this.state.pokemon);
        return (
            <Container>
                <Header>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{justifyContent: 'center', marginLeft: 90, fontSize: 20}}> Favoris{"\n"}</Text>
                        <View style={{
                            borderColor: "#2196F3",
                            borderWidth: 1,
                            backgroundColor: "#2196F3",
                            justifyContent: "center",
                            marginLeft: 100
                        }}>
                            <Button title="Deconnexion" style={{marginRight: '4%'}} color="white"
                                    onPress={this.signOut}/>
                        </View>
                    </View>
                </Header>
                <Content scrollEventThrottle={1000}>

                    <FlatList
                        style={{height: "auto"}}
                        data={this.state.pokemon}
                        renderItem={({item}) => (
                            <View style={{marginTop: 10}}>
                                <View style={styles.block_pokemon}>
                                    <View style={[styles.block_pokemon, styles.border_image]}>
                                        <Image style={styles.image_pokemon}
                                               source={{uri: `${item.poke.url}`}}/>
                                    </View>
                                    <View style={[styles.block_pokemon, styles.border_favoris]}>
                                        <Text style={styles.text_pokemon}>#{item.poke.id}</Text>
                                        <Text style={styles.text_pokemon}>{item.poke.name}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}