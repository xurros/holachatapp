import React from "react";

// importing Components from react native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";

// importing images and icons
import bgImage from "../assets/background-image.png";
import icon from "../assets/usericon.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    // state will be updated with whatever values change for the specific states
    this.state = {
      name: '',
      bgColor: this.colors.blue
    };
  }

  // function to update the state with the new background color for Chat Screen chosen by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // background colors to choose from; will be used to update bgColor state for easier referencing
  colors = {
    beige: "#DCDBC4",
    grey: "#B1B1A3",
    blue: "#97C1DE",
    blush: "#B5998B"
  };

  render() {
    return (
      //Different components do differents things; View acts as a div from html
      <View style={styles.container}>

        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}>

          <View style={styles.titleBox}>
            <Text style={styles.titleText}>HOLA!</Text>
            <Text style={styles.miniText}>chat-app</Text>
          </View>

          <View style={styles.box}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.image} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.colorText}> Pick a Background Color: </Text>
            </View>

            <View style={styles.colorList}>
              <TouchableOpacity
                accesible={true}
                style={styles.beige}
                onPress={() => this.changeBgColor(this.colors.beige)}>
              </TouchableOpacity>

              <TouchableOpacity
                accesible={true}
                style={styles.grey}
                onPress={() => this.changeBgColor(this.colors.grey)}>
              </TouchableOpacity>

              <TouchableOpacity
                accesible={true}
                style={styles.blue}
                onPress={() => this.changeBgColor(this.colors.blue)}>
              </TouchableOpacity>

              <TouchableOpacity
                accesible={true}
                style={styles.blush}
                onPress={() => this.changeBgColor(this.colors.blush)}>
              </TouchableOpacity>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', {
                name: this.state.name,
                bgColor: this.state.bgColor
              })}>

              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>

          </View>

        </ImageBackground>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "50%",
    width: "90%",
    alignItems: "center",
    paddingTop: 120
  },

  titleText: {
    fontSize: 45,
    fontWeight: "700",
    color: "#C6690B",
  },

  miniText: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "lowercase",
    color:"#5E530A"
  },

  box: {
    backgroundColor: "#F1F1EC",
    height: "44%",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "#B1B1A3",
    width: "80%",
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10
  },

  input: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "lowercase",
    opacity: 0.5,
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 50,
    width: '88%'
  },

  colorText: {
    fontSize: 16,
    marginLeft: "60",
    fontWeight: "300",
    textTransform: "lowercase",
    color: '#757083',
    opacity: 1,
  },

  colorList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingRight: 0
  },

  beige: {
    backgroundColor: "#DCDBC4",
    width: 50,
    height: 50,
    borderRadius: 10
  },

  grey: {
    backgroundColor: "#B1B1A3",
    width: 50,
    height: 50,
    borderRadius: 10
  },

  blue: {
    backgroundColor: "#97C1DE",
    width: 50,
    height: 50,
    borderRadius: 10
  },

  blush: {
    backgroundColor: "#B5998B",
    width: 50,
    height: 50,
    borderRadius: 10
  },

  button: {
    width: "80%",
    height: 70,
    backgroundColor: "#EC8713",
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});