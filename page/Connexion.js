import React, {Component} from 'react';
import { Container, Header, Content, Form, Item, Input,Label,  Body} from 'native-base';
import {View, Text, Button} from "react-native";
import * as firebase from "firebase";


export default class Connexion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            errorMessage: null,
            login : null
        };
    }

    componentDidMount() {
    }


    signInUser = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => this.setState({errorMessage: error.message}))

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({login: true})
                this.props.navigation.navigate("Liste Pokemon")

            } else {
                this.setState({login: false})
                alert("Votre login ou mot de passe est incorrect")
            }
        });
    };

    render() {

        return (
            <Container>
                <Content>
                    <Text style={{textAlign:'center'}}> Connexion{"\n"}</Text>
                    <Form>
                        <Item>
                            <Input
                                placeholder="email"
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="password"
                                onChangeText={password => this.setState({password})}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>
                    <Body style={{ marginTop:'4%', flex:1, flexDirection:'row'}}>
                        <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3"}}>
                            <Button title="Se connecter" style={{marginRight:'4%'}}  color="white" onPress={this.signInUser}/>
                        </View>
                        <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3", marginLeft:5}}>
                            <Button  title="S'inscrire"  color="white" onPress={() => this.props.navigation.navigate("Inscription")}/>
                        </View>
                    </Body>
                </Content>
            </Container>
        );
    }
}