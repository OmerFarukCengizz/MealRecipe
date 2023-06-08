import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuBar from './Menu';
const Kategoriler = () => {
  const [kategoriler, setKategoriler] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => {
        setKategoriler(data.categories || []);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleKategoriPress = (kategori) => {
    navigation.navigate('YemekListesi', { kategori });
  };

  const renderKategori = ({ item }) => (
    <TouchableOpacity style={styles.kategoriContainer} onPress={() => handleKategoriPress(item)}>
      <Image source={{ uri: item.strCategoryThumb }} style={styles.kategoriResim} />
      <Text style={styles.kategoriText}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Categories</Text>
      <FlatList
        data={kategoriler}
        renderItem={renderKategori}
        keyExtractor={(item) => item.idCategory.toString() }
        numColumns={2}
      />
      <MenuBar/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    baslik: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    kategoriContainer: {
      flex: 1,
      margin: 8,
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 16,
      backgroundColor: 'white',
    },
    kategoriResim: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 8,
    },
    kategoriText: {
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default Kategoriler;
