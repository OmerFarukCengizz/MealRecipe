import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MenuBar from './Menu';

const TarifDetay = ({ route, navigation }) => {
  const { tarif } = route.params || {};

  if (!tarif) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Tarif bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: tarif.strMealThumb }} style={styles.tarifResim} />
          <Text style={styles.tarifBaslik}>{tarif.strMeal}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {renderIngredients(tarif)}
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.tarifDetay}>{tarif.strInstructions}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Category: {tarif.strCategory}</Text>
          <Text style={styles.infoText}>Area: {tarif.strArea}</Text>
          <Text style={styles.infoText}>Tags: {tarif.strTags}</Text>
        </View>
      </ScrollView>
      <MenuBar />
    </View>
  );
};

const renderIngredients = (tarif) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const amountKey = `strMeasure${i}`;
    if (tarif[ingredientKey] && tarif[amountKey]) {
      const ingredient = (
        <View key={i} style={styles.ingredientItem}>
          <Image source={{ uri: `https://www.themealdb.com/images/ingredients/${tarif[ingredientKey]}.png` }} style={styles.ingredientImage} />
          <Text style={styles.ingredientText}>{tarif[amountKey]} {tarif[ingredientKey]}</Text>
        </View>
      );
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tarifResim: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  tarifBaslik: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  contentContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    alignSelf: 'center',
  },
  ingredientImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
  },
  tarifDetay: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    fontStyle: 'italic',
  },
});

export default TarifDetay;
