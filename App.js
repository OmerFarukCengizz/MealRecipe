import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AnaSayfa from './src/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TarifDetay from './src/TarifDetay';
import Kategoriler from './src/Kategoriler';
import YemekListesi from './src/YemekListesi';
import Arama from './src/Arama';
import RandomYemek from './src/RandomYemek';
import { useEffect, BackHandler } from 'react-native';

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackVisible:false
      }}>

      <Stack.Screen
        name="HomeScreen"
        component={AnaSayfa}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
      <Stack.Screen
        name="TarifDetay"
        component={TarifDetay}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
      
      <Stack.Screen
        name="Kategoriler"
        component={Kategoriler}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
      <Stack.Screen
        name="YemekListesi"
        component={YemekListesi}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
      <Stack.Screen
        name="Arama"
        component={Arama}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
      <Stack.Screen
        name="RandomYemek"
        component={RandomYemek}
        options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: "#FF000000" } }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{title: '', headerTransparent:true,headerStyle: { backgroundColor: "#FF000000" }}}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});