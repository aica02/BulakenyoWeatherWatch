import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import WeatherScreen from './src/screens/WeatherScreen';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";


export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  return <WeatherScreen />;
}
