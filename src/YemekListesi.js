import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuBar from './Menu';
import TarifDetay from './TarifDetay';

const YemekListesi = ({ route }) => {
  const [yemekler, setYemekler] = useState([]);
  const [seciliTarif, setSeciliTarif] = useState(null);
  const [loading, setLoading] = useState(true);
  const { kategori } = route.params;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategori.strCategory}`);
        const data = await response.json();
        const meals = data.meals || [];
        const mealIds = meals.map((meal) => meal.idMeal);
  
        const promises = mealIds.map(async (mealId) => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
          const data = await response.json();
          return data.meals[0];
        });
  
        const fullRecipes = await Promise.all(promises);
        setYemekler(fullRecipes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchRecipes();
  }, [kategori]);
  
  const navigation = useNavigation();
  const openTarifDetay = (tarif) => {
    navigation.push('TarifDetay', { tarif: tarif });
  };
  const closeTarifDetay = () => {
    setSeciliTarif(null);
  };

  const renderYemek = ({ item }) => (
    <TouchableOpacity style={styles.yemekContainer} onPress={() => openTarifDetay(item)}>
      <Image source={{ uri: item.strMealThumb }} style={styles.yemekResim} />
      <Text style={styles.yemekBaslik}>{item.strMeal}</Text>
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

  if (yemekler.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.baslik}>Veri bulunamadı.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>{kategori.strCategory}</Text>
      <FlatList
        data={yemekler}
        renderItem={renderYemek}
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
  yemekContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    backgroundColor: 'white',
  },
  yemekResim: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  yemekBaslik: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default YemekListesi;
