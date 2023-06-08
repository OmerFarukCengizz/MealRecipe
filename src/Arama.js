import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MenuBar from './Menu';
import TarifDetay from './TarifDetay';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TarifItem = memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.yemekContainer} onPress={() => onPress(item)}>
    <Text style={styles.yemekBaslik}>{item.strMeal}</Text>
  </TouchableOpacity>
));

const Arama = () => {
  const [aramaKelimesi, setAramaKelimesi] = useState('');
  const [yemekler, setYemekler] = useState([]);
  const [aramaSonucu, setAramaSonucu] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => {
        const kategoriler = data.categories;
        let tumYemekler = [];
        Promise.all(
          kategoriler.map((kategori) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategori.strCategory}`)
              .then((response) => response.json())
              .then((data) => data.meals)
              .catch((error) => console.error(error))
          )
        )
          .then((kategoriYemeklerListesi) => {
            const tumYemekler = kategoriYemeklerListesi.flat();
            setYemekler(tumYemekler);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  const aramaYap = useCallback((kelime) => {
    if (kelime.trim() === '') {
      setAramaSonucu(yemekler);
    } else {
      const sonuc = yemekler.filter((yemek) =>
        yemek.strMeal.toLowerCase().includes(kelime.toLowerCase())
      );
      setAramaSonucu(sonuc);
    }
  }, [yemekler]);

  const openTarifDetay = useCallback(async (tarif) => {
    const detay = await fetchMealDetails(tarif.idMeal);
    if (detay) {
      navigation.navigate('TarifDetay', { tarif: detay });
    }
  }, [navigation]);

  const fetchMealDetails = useCallback(async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TarifItem item={item} onPress={openTarifDetay} />
  ), [openTarifDetay]);

  const ITEM_HEIGHT = 60;

  return (
    <View style={styles.container}>
      <View style={styles.aramaContainer}>
        <Icon name="search" size={20} style={styles.aramaIcon} />
        <TextInput
          style={styles.aramaInput}
          placeholder="Arama yapın..."
          onChangeText={(text) => {
            setAramaKelimesi(text);
            aramaYap(text);
          }}
          value={aramaKelimesi}
        />
      </View>
      <FlatList
        data={aramaSonucu}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal}
        getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  aramaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  aramaIcon: {
    marginRight: 10,
    color: 'gray',
  },
  aramaInput: {
    flex: 1,
    fontSize: 16,
  },
  yemekContainer: {
    marginBottom: 8,
  },
  yemekBaslik: {
    fontSize: 16,
  },
});

export default Arama;
