import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, Linking, Alert } from 'react-native';
import { Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold, useFonts } from '@expo-google-fonts/urbanist';
import * as MediaLibrary from 'expo-media-library';

import { PlayerProvider } from './src/context/PlayerContext';

import { Home } from './src/screens/Home';



export default function App() {

  const [permissionResponse] = MediaLibrary.usePermissions({
    get: true,
    request: true,
    writeOnly: true,
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });


  useEffect(() => {
    if (permissionResponse) {
      if (permissionResponse.canAskAgain && !permissionResponse.granted) {
        BackHandler.exitApp();
      } else if (!permissionResponse.canAskAgain) {
        Alert.alert(
          "Permission",
          "The Permission is necessary to working of app",
          [
            {
              text: "OK",
              onPress: () => {
                Linking.openSettings();
              }
            }
          ]
        );
      }
    }
  }, [permissionResponse]);


  if (!fontsLoaded || !permissionResponse?.granted) {
    return null
  }



  return (
    <PlayerProvider>
      <Home />
      <StatusBar backgroundColor='transparent' translucent style='light' />
    </PlayerProvider>
  );
}