# holachatapp
The Select control for React. Initially built for use in KeystoneJS.

See react-select.com for live demos and comprehensive docs.

React Select is funded by Thinkmill and Atlassian. It represents a whole new approach to developing powerful React.js components that just work out of the box, while being extremely customisable.

For the story behind this component, watch Jed's talk at React Conf 2019 - building React Select

Features include:

Flexible approach to data, with customisable functions
Extensible styling API with emotion
Component Injection API for complete control over the UI behaviour
Controllable state props and modular architecture
Long-requested features like option groups, portal support, animation, and more
Using an older version?
v3, v4, and v5 upgrade guide
v2 upgrade guide
React Select v1 documentation and examples are available at v1.react-select.com
Installation and usage
The easiest way to use react-select is to install it from npm and build it into your app with Webpack.

yarn add react-select
Then use it in your app:

With React Component
import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class App extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
With React Hooks
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}



CHAT APP

Simple chat application creeated with React Native intended for use on mobile devices. Users can set their name, update the background color of the chat room, send pictures, and chat with friends and family. Users can also send images and their locations to other users. This app will be compatible with a screen reader for users with vision impairment.

User Stories

As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
As a user, I want to send images to my friends to show them what I’m currently doing.
As a user, I want to share my location with my friends to show them where I am.
As a user, I want to be able to read my messages offline so I can reread conversations at any time.
As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.
Key Features

A page where users can enter their name and choose a background color for the chat screen before joining the chat.
A page displaying the conversation, as well as an input field and submit button.
The chat must provide users with two additional communication features: sending images and location data.
Data gets stored online and offline.
Tools Used

Node.js
React Native
Expo
Google firebase
Gifted Chat
Installation

Fork or download this repo
npm/yarn install int he terminal to install dependencies
How to use

Download and install app
Install Expo globally (npm install --global expo-cli)
Use command (expo start) to start the app
Open the app with Android Studio on your pc or with the Expo Go app on your smartphone
