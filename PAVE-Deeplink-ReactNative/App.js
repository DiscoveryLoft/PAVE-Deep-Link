/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {View, Text, Button} from 'react-native';

const App = () => {
  const API_KEY = 'YOUR-API-KEY'; /* <====== PUT YOUR API KEY HERE */

  const REDIRECT_URL = 'pave://'; /* DO NOT EDIT THIS */

  const [sessionID, setSessionID] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [receivedUrl, setReceivedUrl] = useState('');

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => handleURL({url}))
      .catch(console.error);

    Linking.addEventListener('url', handleURL);
  }, []);

  function handleURL(event) {
    setReceivedUrl(event.url);
    console.log('url ======> ' + event.url);
  }

  const generateSessionID = () => {
    var formData = new FormData();
    formData.append('redirect_url', REDIRECT_URL);

    var requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    fetch(
      `https://api.paveapi.com/v1/generate-session-id/${API_KEY}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setSessionID(result.session_key);
        setRedirectUrl(result.redirect_url);
      })
      .catch(error => console.log('error', error));
  };

  const routeToPaveCapture = () => {
    const PAVE_CAPTURE_PATH = 'https://api.paveapi.com/v1/launch/';
    Linking.openURL(PAVE_CAPTURE_PATH + sessionID);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        }}>
        PAVE DEEP LINK
      </Text>
      <View style={{height: 10}} />
      <View>
        <Text style={{fontWeight: 'bold'}}>SessionID</Text>
        <Text>{sessionID}</Text>
      </View>
      <View style={{height: 10}} />
      <View>
        <Text style={{fontWeight: 'bold'}}>SEND REDIRECT_URL:</Text>
        <Text>{redirectUrl}</Text>
      </View>
      <View style={{height: 10}} />
      <View>
        <Text style={{fontWeight: 'bold'}}>RECEIVED REDIRECT_URL:</Text>
        <Text>{receivedUrl}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
        <Button
          title="Create Session"
          disabled={sessionID !== ''}
          onPress={generateSessionID}
        />
        <View style={{width: 10}} />
        <Button
          title="Get Started"
          disabled={sessionID === ''}
          onPress={routeToPaveCapture}
        />
      </View>
    </View>
  );
};

export default App;
