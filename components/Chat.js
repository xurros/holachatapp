import React from "react";
import {
  GiftedChat,
  InputToolbar,
  Bubble
} from "react-native-gifted-chat";

import {
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";


// Configuration link to Firestore so your app can connect with the database 
const firebaseConfig = {
  apiKey: "AIzaSyAgz64iBeR5MYHM_QXlZMJHbSAU2wfzcKg",
  authDomain: "holachatapp-bcd90.firebaseapp.com",
  projectId: "holachatapp-bcd90",
  storageBucket: "holachatapp-bcd90.appspot.com",
  messagingSenderId: "758351531581",
  appId: "1:758351531581:web:d903d47c6f5a58ab3ca454",
  measurementId: "G-17F6YGEXPK",
};

const app = initializeApp(firebaseConfig);

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        username: "",
        avatar: "",
      },
      isConnected: false,
    };

    // Firebase initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Firestore database message collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;
  }

  // get string messages from local storage, then parse to JSON format
  async getMessages() {
    const messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      alert(error);
      console.log(error.message);
    }
  };

  // save JSON messages to local storage in string format
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages));
    } catch (error) {
      alert(error);
      console.log(error.message);
    }
  };

  // delete messages from local storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: []
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  onCollectionUpdate = QuerySnapshot => {
    const messages = [];

    // go through each document
    QuerySnapshot.forEach((doc) => {
      let data = doc.data();

      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          username: data.user.username,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages();
  };

  componentDidMount() {
    const username = this.props.route.params.username;

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");


        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);

        // user authentication ====
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            this.setState({
              uid: "",
              messages: [],
              user: {
                _id: "",
                text: "Hola" + " " + username + "!",
                createdAt: new Date(),
                avatar: "https://joeschmoe.io/api/v1/140/",
              },
            });

            //messages for current user
            this.refMsgsUser = firebase
              .firestore()
              .collection("messages")
              .where("uid", "==", this.state.uid);
          });

        // save messages locally ( save messages locally to AsyncStorage)
        this.saveMessages();
      } else {

        // if the user is offline
        this.setState({ isConnected: false });
        console.log("offline");

        //retrieve chat from asyncstorage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    NetInfo.fetch().then((connection) => {

      if (connection.isConnected) {
        // stop authenticating
        this.authUnsubscribe();
        // stop any changes
        this.unsubscribe();
      }
    });
  }

  //addMessage function (Add messages to database)
  addMessage() {
    const message = this.state.messages[0];
    // add a new message to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  //attaches messages to chat
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        // add to db
        this.addMessage();

        //  add to local storage
        this.saveMessages();
      });
  }

  //customizes text bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#C1CB92"
          },
          left: {
            backgroundColor: "#e2e5e9"
          }
        }}
      />
    )
  }

  //customizes input toolbar if online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {

      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  render() {
    //entered name state from Start screen gets  displayed in status bar at the top of the app

    const { bgColor } = this.props.route.params;

    return (

      <View style={{
        flex: 1,
        backgroundColor: bgColor
      }} >

        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          isConnected={this.state.isConnected}

          user={{
            _id: this.state.user._id,
            username: this.state.username,
            avatar: "https://joeschmoe.io/api/v1/140/",
          }}
        />

        {
          Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null
        }

      </View >
    );
  }
}


