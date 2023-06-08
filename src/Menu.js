import React from 'react';
import { View, Dimensions, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';


const MenuBar = () => {
  const navigation = useNavigation();

  const navigateToHomePage = () => {
    navigation.navigate('HomeScreen');
  };

  const navigateToCategoriesPage = () => {
    navigation.navigate('Kategoriler');
  };

  const navigateToSearchPage = () => {
    navigation.navigate('Arama');
  };

  const navigateToRandomRecipePage = () => {
    navigation.navigate('RandomYemek');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={navigateToHomePage} style={styles.menuItem}>
          <FaIcon name="home" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCategoriesPage} style={styles.menuItem}>
          <FaIcon name="bars" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSearchPage} style={styles.menuItem}>
          <FaIcon name="search" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRandomRecipePage} style={styles.menuItem}>
          <FaIcon name="random" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',   
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    backgroundColor: 'lightgreen',  
    width: Dimensions.get('window').width, 
  },
  menuItem: {
    marginHorizontal: 8,
  },
});

export default MenuBar;
