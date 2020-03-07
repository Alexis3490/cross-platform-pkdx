import React, {Component} from 'react';
import { Container, Header, Content, Form, Item, Input,Label, Body} from 'native-base';
import {View,TextInput, Text, Button} from "react-native";
import * as firebase from "firebase";


export default class Connexion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password: '',
            errorMessage: null
        };
    }

    componentDidMount() {

    }

    signUpUser = () => {
        if(this.state.password.length >= 6) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(userCredential => {
                    return userCredential.user.updateProfile({
                        displayName: this.state.name
                    })
                })
                .catch(error => this.setState({errorMessage: error.message}))
            if (this.state.errorMessage === null) {
                this.props.navigation.navigate("Connexion")
            }
        }
        else
        {
            alert("Votre champ pasword doit compoter au moins 6 charactère")
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Text style={{textAlign:'center', fontSize:20}}>S'inscrire{"\n"}</Text>
                    <Form>
                        <Item>
                            <Input
                                placeholder="name"
                                onChangeText={name => this.setState({name})}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="email"
                                onChangeText={email => this.setState({email})}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Input
                                placeholder="password"
                                onChangeText={password => this.setState({password})}
                            />
                        </Item>
                    </Form>
                    <Body style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center', marginTop:'4%'}}>

                        <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3"}}>
                            <Button color="white" title="S'inscrire" style={{marginRight:'4%'}} onPress={this.signUpUser}/>
                        </View>

                    </Body>
                </Content>
            </Container>
        );
    }
}