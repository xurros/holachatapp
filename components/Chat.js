import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView } from "react-native";


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    const username = this.props.route.params.username;

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hola" + " " + username + "!",
          createdAt: new Date(),
          user: {
            _id: 2,
            username: "React Native",
            avatar: "https://joeschmoe.io/api/v1/random",
          },
        },

        {
          _id: 2,
          text: "This is a system message ",
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#354B66",
          },
          left: {
            backgroundColor: "#F5F2F1",
          },
        }}
      />
    );
  }

  render() {
    //entered name state from Start screen gets  displayed in status bar at the top of the app
    const username = this.props.route.params.username;
    this.props.navigation.setOptions({ title: username });

    const { bgColor } = this.props.route.params;

    return (

      <View style={{
        flex: 1,
        backgroundColor: bgColor
      }}>

        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}

      </View>
    );
  }
}


