/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import CategoryCard from '../../components/cards/CategoryCard';
import LinkButton from '../../components/buttons/LinkButton';
import { Heading5 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

// Home Config
const imgHolder = require('../../assets/img/imgholder.png');

// Home Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 228,
    resizeMode: 'contain',
    borderRadius: 0,
    marginTop: -0.5
    //backgroundColor:'#000'
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  category: {
    position: 'absolute',
    bottom: -20,
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 17,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 8,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  categoryHeading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 40
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 5,
  },
  popularCategoriesList: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  buttonContainer: {
    padding: 30,
    // backgroundColor: Colors.primaryColor
  },
});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: sample_data.products,
      categories: sample_data.categories,
      popularCategories: sample_data.popularCategories
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { popularCategories } = this.state;
    const index = popularCategories.indexOf(item);

    if (quantity < 0) {
      return;
    }
    popularCategories[index].quantity = quantity;

    this.setState({
      popularCategories: [...popularCategories],
    });
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { popularCategories } = this.state;

    const index = popularCategories.indexOf(item);
    popularCategories[index].quantity = quantity + 1;

    this.setState({
      popularCategories: [...popularCategories],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo('Category')}
          style={styles.cardContainer}
        // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  renderPopularProductItem = ({ item, index }) => (
    <CategoryCard
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      starRating={true}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      cartButton={true}
    />
  );



  render() {
    const { categories, products, popularCategories } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.white}
          barStyle="dark-content"
        />
        <View style={styles.titleContainer}>
          <Heading5 style={styles.titleText, { paddingTop: 10, paddingBottom: 20 }}>What are you looking for?</Heading5>
        </View>
        <FlatList
          data={popularCategories}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderPopularProductItem}
          contentContainerStyle={styles.popularCategoriesList}
        />
        <View style={styles.buttonContainer}>
          <Button
           onPress={this.navigateTo('HomeNavigator')}
            color={Colors.primaryColor}
            rounded
            borderRadius={'10'}
            title={'Next'.toUpperCase()}
            titleColor={'#fff'}
          />
        </View>
      </SafeAreaView>
    );
  }
}