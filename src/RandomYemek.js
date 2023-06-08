import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuBar from './Menu';



const RandomYemek = () => {
  const [randomYemek, setRandomYemek] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    getRandomYemek();
  }, []);

  const getRandomYemek = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      const yemek = data.meals[0];
      setRandomYemek(yemek);
    } catch (error) {
      console.error(error);
    }
  };

  const openTarifDetay = async () => {
    if (randomYemek) {
      navigation.navigate('TarifDetay', { tarif: randomYemek });
    }
  };

  return (
    <View style={styles.container}>
      {randomYemek ? (
        <>
          <Text style={styles.pageTitle}>What Should I Cook Today</Text>
          <TouchableOpacity style={styles.yemekContainer} onPress={openTarifDetay}>
            <Image style={styles.yemekImage} source={{ uri: randomYemek.strMealThumb }} />
            <Text style={styles.yemekBaslik}>{randomYemek.strMeal}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yenileButton} onPress={getRandomYemek}>
            <Text style={styles.yenileButtonText}>Refresh</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.menuBar}>
      <MenuBar />
    </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  yemekContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  yemekImage: {
    width: 200,
    height: 200,
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  yemekBaslik: {
    fontSize: 24,
  },
  yenileButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  yenileButtonText: {
    color: 'white',
    fontSize: 16,
  },
  menuBar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default RandomYemek;
