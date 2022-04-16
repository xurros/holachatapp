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
  Platform,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

// importing images and icons
import bgImage from "../assets/background-image.png";
import icon from "../assets/usericon.png";

import "firebase/firestore";



export default class Start extends React.Component {
  constructor(props) {
    super(props);

    // default background color
    this.state = {
      name: "",
      bgColor: "",
    };
  }

  // function to update the state with the new background color for Chat Screen chosen by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // background colors to choose from; will be used to update bgColor state for easier referencing
  colors = {
    // smoke: "#6E7376",
    // honey: "#d8b26e",
    // rose: "#cebeb9"
    earl: "#a4998c",
    mocha: "#514c4a",
    grass: "#3f5843",
    orange: "#c78a44"
  };


  render() {
    return (
      //Different components do differents things; View acts as a div in html form
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}>

          {/* main title */}
          <View style={styles.titleBox}>
            <Text style={styles.titleText}></Text>
            <Text style={styles.miniText}></Text>
          </View>

          {/* user box */}
          <View style={styles.box}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.icon} />

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.colorText}> Pick a Background Color: </Text>

              <View style={styles.colorList}>

                <TouchableOpacity
                  accesible={true}
                  accessibilityLabel="color1"
                  accessibilityHint="color1 as the background"
                  accessibilityRole="button"
                  onPress={() => {
                    this.changeBgColor("#a4998c");
                  }}
                  style={[styles.earl]}
                >
                </TouchableOpacity>

                <TouchableOpacity
                  accesible={true}
                  accessibilityLabel="color2"
                  accessibilityHint="color2 as the background"
                  accessibilityRole="button"
                  onPress={() => {
                    this.changeBgColor("#514c4a");
                  }}
                  style={[styles.mocha]}
                >
                </TouchableOpacity>

                <TouchableOpacity
                  accesible={true}
                  accessibilityLabel="color3"
                  accessibilityHint="color3 as the background"
                  accessibilityRole="button"
                  onPress={() => {
                    this.changeBgColor("#3f5843");
                  }}
                  style={[styles.grass]}
                >
                </TouchableOpacity>

                <TouchableOpacity
                  accesible={true}
                  accessibilityLabel="color4"
                  accessibilityHint="color4 as the background"
                  accessibilityRole="button"
                  onPress={() => {
                    this.changeBgColor("#c78a44");
                  }}
                  style={[styles.orange]}
                >
                </TouchableOpacity>

              </View>
            </View>

            <Pressable
              accessible={true}
              acccessibilityLabel="Chatroom"
              accessibilityHint="let you enter the Chatroom"
              accessibilityRole=""
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor
                })
              }
            >

              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>

          </View>
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
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

  //  for the title page before entering the chatroom
  titleText: {
    fontSize: 45,
    fontWeight: "700",
    color: "#C6690B",
  },

  miniText: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "lowercase",
    color: "#5E530A",
  },

  box: {
    backgroundColor: "#F1F1EC",
    height: "44%",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    marginTop: 30,
    marginBottom: 20,
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
    marginRight: 10,
    marginLeft: "30%"
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.5,
  },


  colorBox: {
    marginRight: "auto",
    paddingLeft: 50,
    width: '88%'
  },

  // color for wording "Pick a Background"
  colorText: {
    fontSize: 16,
    fontWeight: "400",
    textTransform: "lowercase",
    // color: "#757083",
    color: "#BF1B49",
    textAlign: "center",

  },

  colorList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingRight: 0
  },

  earl: {
    backgroundColor: "#a4998c",
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    width: 30,
    height: 50,
  },

  mocha: {
    backgroundColor: "#514c4a",
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    width: 30,
    height: 50,
  },

  grass: {
    backgroundColor: "#3f5843",
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    width: 30,
    height: 50,
  },

  orange: {
    backgroundColor: "#c78a44",
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    width: 30,
    height: 50,
  },

  button: {
    marginTop: "10%",
    width: "80%",
    height: 70,
    // backgroundColor: "#EC8713",
    backgroundColor: "#d8b26e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },

  box: {
    alignItems: "center",
    backgroundColor: "#e1dad2",
    alignSelf: "auto",
    borderRadius: 25,
    flexDirection: "column",
    height: 320,
    width: 350,
  },
});