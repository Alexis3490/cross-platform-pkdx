import React, {Component} from 'react';
import {Container, Content, Text,  Body, Thumbnail, Footer, Header, Input, Item, Icon} from 'native-base';
import {View, FlatList, Button} from "react-native";
import { WebView } from 'react-native-webview';



export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            search:""
        };
    }

    componentDidMount() {

    }

    search_terms()
    {
       this.setState({search : this.state.input})
    }

    render() {
        const {search}= this.state
        return (
            <Container>
                <Item>
                    <Input placeholder="Search" onChangeText={(textValue) => this.setState({
                        input: textValue})}/>
                    <View style={{borderColor: "#2196F3", borderWidth:1, backgroundColor:"#2196F3"}}>
                    <Button color="white" title="Search" onPress={() => this.search_terms()}>
                    </Button>
                    </View>
                </Item>
                {search !== "" ?<WebView source={{ uri: `https://www.google.com/search?hl=fr&source=hp&ei=qJpiXuOsBOKMlwTAzbrwBg&q=${search}&btnK=Recherche+Google` }} />: <Text></Text>}

           </Container>
        );
    }
}
