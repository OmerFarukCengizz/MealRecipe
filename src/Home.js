import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MenuBar from './Menu';
import TarifDetay from './TarifDetay';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const AnaSayfa = () => {
  const [populerTarifler, setPopulerTarifler] = useState([]);
  const [seciliTarif, setSeciliTarif] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => {
        setPopulerTarifler(data.meals || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const navigation = useNavigation();

  const openTarifDetay = (tarif) => {
    navigation.push('TarifDetay', { tarif: tarif });
  };

  const closeTarifDetay = () => {
    setSeciliTarif(null);
  };

  const renderTarif = ({ item }) => (
    <TouchableOpacity style={styles.tarifContainer} onPress={() => openTarifDetay(item)}>
      <Image source={{ uri: item.strMealThumb }} style={styles.tarifResim} />
      <Text style={styles.tarifBaslik}>{item.strMeal}</Text>
      <Text style={styles.tarifKategori}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  if (seciliTarif) {
    return <TarifDetay tarif={seciliTarif} onClose={closeTarifDetay} />;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.baslik}>Loading...</Text>
      </View>
    );
  }

  if (populerTarifler.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.baslik}>Data not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Trending Recipes</Text>
      <FlatList
        data={populerTarifler}
        renderItem={renderTarif}
        keyExtractor={(item) => item.idMeal.toString()}
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
  tarifContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  tarifResim: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  tarifBaslik: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  tarifKategori: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default AnaSayfa;
