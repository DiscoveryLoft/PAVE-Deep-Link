import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';

const App = () => {
  const [url, setUrl] = useState('');

  const API_KEY = 'fddb6f33-c882-4042-976c-f10b0abdeee8';

  const REDIRECT_URL = 'pave://';

  const [sessionID, setSessionID] = useState('--');
  const [redirectUrl, setRedirectUrl] = useState('--');

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => handleURL({url}))
      .catch(console.error);

    Linking.addEventListener('url', handleURL);
  }, []);

  function handleURL(event) {
    setUrl(event.url);
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
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text>PAVE DEEP LINK: {url}</Text>

      <View>
        <TouchableOpacity
          onPress={generateSessionID}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              width: 140,
              elevation: 4,
              height: 50,
              backgroundColor: 'green',
              borderRadius: 40,
            },
          ]}>
          <Text style={{color: 'white'}}>Create Session</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>SessionID</Text>
        <Text>{sessionID}</Text>
      </View>

      <View>
        <Text>URL_REDIRECT: {redirectUrl}</Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={routeToPaveCapture}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              width: 140,
              elevation: 4,
              height: 50,
              backgroundColor: 'green',
              borderRadius: 40,
            },
          ]}>
          <Text style={{color: 'white'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
