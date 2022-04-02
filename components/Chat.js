import React from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    const { username }  = this.props.route.params
    this.props.navigation.setOptions({ title: username })
  
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello there",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
          },
        },
      ],
    })
  }

  render() {
    //entered name state from Start screen get  itle: name});

    const { bgColor } = this.props.route.params;

    return (
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: bgColor
        }}>
        <Text>Hola Chat!</Text>
      </View>
    )
  }
}