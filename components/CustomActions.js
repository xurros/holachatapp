import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

export default class CustomActions extends Component {
  async pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      });

      console.log(result);
      if (!result.cancelled) {
        const imageUrl = await this.uploadImage(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    } catch (err) {
      console.log(err.message);
    }
  }


  async takePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permissionResult);

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to acces the Camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      const imageUrl = await this.uploadImage(result.uri);
      this.props.onSend({ image: imageUrl });
    }
  }

  async getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status === "granted") {
        let result = await Location.getCurrentPositionAsync({}).catch((error) =>
          console.log(error)
        );
        console.log(result);
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async uploadImage(uri) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const imageNameBefore = uri.split('/');
      const imageName = imageNameBefore[imageNameBefore.length - 1];

      const ref = firebase.storage().ref().child(`images/${imageName}`);

      const snapshot = await ref.put(blob);

      return await snapshot.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
    }
  }

  onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            alert("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            alert("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            alert("user wants to get their location");
            return this.getLocation();
          default:
            return
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
