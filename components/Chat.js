import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Time,
  SystemMessage,
  Day,
  InputToolbar,
} from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyAgz64iBeR5MYHM_QXlZMJHbSAU2wfzcKg",
  authDomain: "holachatapp-bcd90.firebaseapp.com",
  projectId: "holachatapp-bcd90",
  storageBucket: "holachatapp-bcd90.appspot.com",
  messagingSenderId: "758351531581",
  appId: "1:758351531581:web:d903d47c6f5a58ab3ca454",
  measurementId: "G-17F6YGEXPK",
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user:{
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: undefined,
      image: null,
      location: null,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async getmessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  componentDidMount() {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.refChatMsg = firebase.firestore().collection('messages');
        console.log('online');

        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
                avatar: "https://joeschmoe.io/api/v1/random/",
              },
            });

            this.refMsgsUser = firebase
              .firestore()
              .collection('messages')
              .where('uid', '==', this.state.uid);

            this.unsubscribeMsg = this.refChatMsg
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
          });

        this.setState({
          isConnected: true,
        });
      } else {
        console.log('offline');
        this.getmessages();
        this.setState({
          isConnected: false,
        });
      }
    });

    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
      title: name,
      headerStyle: this.props.bgColor,
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: doc.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({ messages });
    this.saveMessages();
  };

  componentWillUnmount() {
    if (this.state.isConnected) {
      this.authUnsubscribe();
      this.unsubscribeMsg();
    }
  }

  onSend(messages = []) {
    this.addmessage(messages[0]);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  addmessage = (message) => {
    message.id = message._id;
    this.refChatMsg.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "#514c4a",
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#bccad6",
          },
          left: {
            backgroundColor: "#f1e3dd",
          },
        }}
      />
    );
  };

  renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  };


  renderDay = (props) => {
    // return <Day {...props} textStyle={{ color: '#667292' }} />;
    // return <Day {...props} textStyle={{ color: "#D5DD10" }} />;
    return <Day {...props} textStyle={{ color: "#bababa" }} />;
  };

  renderInputToolbar = (props) => {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          showsUserLocation={true}
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    const bgColor = this.props.route.params.bgColor;
    return (
      <View style={{
        flex: 1,
        backgroundColor: bgColor,
      }} >

        <GiftedChat
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderInputToolbar={this.renderInputToolbar}
          renderUsernameOnMessage={true}
          renderDay={this.renderDay}
          renderBubble={this.renderBubble}
          renderTime={this.renderTime}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: this.state.name,
            avatar: this.state.user.avatar,
            // avatar: "https://joeschmoe.io/api/v1/random/",
          }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
