/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {View, Text} from 'react-native';

const App = () => {
  const [url, setUrl] = useState('');

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

  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text>PAVE DEEP LINK: {url}</Text>
    </View>
  );
};

export default App;
