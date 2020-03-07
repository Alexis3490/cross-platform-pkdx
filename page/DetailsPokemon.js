import React, {Component} from 'react';
import styles from '../css/pokemon-details'
import {Item, Icon, Container, Header, Input, Content, Body, Thumbnail, Button} from 'native-base';
import {View, FlatList, Text} from "react-native";
import * as firebase from "firebase";
import { Audio, Video } from 'expo-av';
import {fromOrigamiTensionAndFriction} from "react-native-web/dist/vendor/react-native/Animated/SpringConfig";


export default class DetailsPokemon extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }

    componentDidMount() {
        this.FetchTypePokemon();
        this.FetchStatsPokemon()
        this.VerifyFavorit()
    }
    FetchTypePokemon() {
        const {id} = this.props.route.params;
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    type_pokemon: responseJson.types,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    FetchStatsPokemon() {
        const {id} = this.props.route.params;
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    stats_pokemon: responseJson.stats,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    add_Favoris =()=> {
        const {login} = this.props.route.params;
        if(login)
        {
            const {uid} = firebase.auth().currentUser;
            const {id, name} = this.props.route.params;
            firebase.database().ref(`/users/${uid}/${id}`).set(
                {
                    name: name,
                    id: id,
                    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                }
            ).then(() => {
                alert("Ajouter au favoris")
            }).catch((error) => {

            });
        }
        else
        {
            alert("Veuillez vous connecté")
        }

    }

    VerifyFavorit=()=> {
        const {login} = this.props.route.params;
        if(login)
        {
            const user = firebase.auth().currentUser.uid;
            const {id} = this.props.route.params;
            firebase.database().ref(`/users/${user}/${id}`).on("value", snapshot => {
                this.setState({pokemon_info: snapshot.val()})
            });
        }
    }

    DeleteFavorit=()=> {
        const {login} = this.props.route.params;
        if(login)
        {
            const user = firebase.auth().currentUser.uid;
            const {id} = this.props.route.params;
            const userRef = firebase.database().ref(`/users/${user}/${id}`);
            userRef.remove();
            alert("Supprimé des favoris")
            firebase.database().ref(`/users/${user}/${id}`).on("value", snapshot => {
                this.setState({pokemon_info: snapshot.val()})
            });
        }
        else {
            alert("Veuillez vous connecter")
        }

    }

    play_sound()
    {
        const {name} = this.props.route.params;
        const playbackObject =  Audio.Sound.createAsync(
            { uri: `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`},
            { shouldPlay: true }
        );

    }



    render() {
        const {id,name, login} = this.props.route.params;
        console.log(this.state.stats_pokemon)
        return (
            <Container>
                <Content scrollEventThrottle={1000}>
                    <Body>
                        <View>
                            <Text style={styles.id_pokemon}>#{id} - {name}</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 10, marginTop: 10}}>
                                {this.state.pokemon_info !== null?
                                    <Button transparent
                                            onPress={this.DeleteFavorit}>
                                        <Thumbnail
                                            source={require(`../images/icon_star_selected.png`)}/>
                                    </Button>
                                    :
                                    <Button transparent
                                            onPress={this.add_Favoris}>
                                        <Thumbnail
                                            source={require(`../images/icon_star_unselected.png`)}/>
                                    </Button>
                                }

                                {login ?
                                    <Button transparent
                                            onPress={()=>this.play_sound()}>
                                        <Thumbnail
                                            source={require(`../images/sound.png`)}/>
                                    </Button>
                                    :
                                    <Text>

                                    </Text>}
                            </View>
                            <View style={styles.border_image}>
                                <Thumbnail style={styles.image_pokemon}
                                           source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}}
                                />
                            </View>

                            <FlatList
                                style={{height:"auto"}}
                                data={this.state.type_pokemon}
                                renderItem={({item}) =>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={[styles[item.type.name], styles.espace_type]}>{item.type.name}</Text>
                                    </View>
                                }
                            />
                            <View style={{flex: 1, flexDirection: 'row', fontSize: 20, borderWidth:1, borderColor:"#a3a3a3", backgroundColor:'#a3a3a3', marginTop:10}}>
                                <Text style={{marginLeft:150, fontSize:20}}> Stats</Text>
                            </View>
                               <View style={{flex :1, flexDirection:'row', justifyContent :'center ',borderWidth:1, borderColor:"#a3a3a3", backgroundColor:"#a3a3a3"}}>
                                <Text style={{marginLeft:90, fontSize:18}}>Base</Text>
                                    <Text style={{marginLeft:30, fontSize:18}}> Effort</Text>
                                <Text style={{marginLeft:50, fontSize:18}}> Nom</Text>
                                </View>
                                <FlatList
                                    style={{height: "auto"}}
                                    data={this.state.stats_pokemon}
                                    renderItem={({item}) =>
                                        <View style={{flex:1, flexDirection:'row',borderWidth:1, borderColor:"#a3a3a3", backgroundColor:"#a3a3a3"}}>
                                            <Text style={{marginLeft:90, fontSize:14}}>{item.base_stat}</Text>
                                            <Text style={{marginLeft:70, fontSize:14}}> {item.effort}</Text>
                                            <Text style={{marginLeft:80, fontSize:14}}>{item.stat.name}</Text>
                                        </View>
                                    }
                                />
                            </View>
                    </Body>

                </Content>
            </Container>
        );
    }
}