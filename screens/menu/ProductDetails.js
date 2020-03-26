import React, { useState} from 'react';
import { View, Text, StyleSheet, Button, ScrollView,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import * as cartActions from '../../store/actions/cart';
import DrinkForm from '../../components/shop/DrinkForm';
import { RadioButton } from 'react-native-paper';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductDetails = ({route}) => {


    const dispatch = useDispatch();
    const productId = route.params.productId;


     const selectedProduct = useSelector(state =>
        state.products.availableDrinks.find(prod => prod.id === productId));

        console.log(selectedProduct);

    return(
        <ScrollView>
            <Text>{selectedProduct.name}</Text>
            <Text>{selectedProduct.type.name}</Text>
            <View>
              <View>
                  <Text>
                      {selectedProduct.price.toFixed(2)}
                  </Text>
              </View>
          </View>
          <TouchableOpacity>
            <Button
            color={Colors.secondary}
            title="Add to Cart"
            onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
            />
            </TouchableOpacity>
        </ScrollView>
    )
}

export const screenOptions = navData => {
    return {
      headerTitle: navData.route.params.productTitle,
      headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="cart"
          iconName={'md-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}  />
      </HeaderButtons>
    )
  };
}

const styles = StyleSheet.create({
    price:{
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    type: {
        fontSize: 18,
        textAlign: 'center'
    }
})

export default ProductDetails;
