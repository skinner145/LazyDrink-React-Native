import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
const CartItem = props => {
    let price = props.price;



    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
              <View style={styles.left}>
                <Text style={styles.mainText}>{props.title}</Text>
                <Text style={styles.quantity}>Quantity: {props.quantity}</Text>
              </View>
            </View>
            <View style={styles.itemData}>
              <View style={styles.right}>
              <Text style={styles.mainText}>€{parsePrice(price)}</Text>
              {props.deletable &&(
              <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                  <Icon name="trash-2" size={25} color={Colors.divider}/>
              </TouchableOpacity>
              )}
              </View>
            </View>
        </View>
    )
};

const parsePrice = (x) => {
    return(
        Number.parseFloat(x).toFixed(2)
    )
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 230,
        padding: 5,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'Roboto-Thin',
        color: '#888',
        fontSize: 14
    },
    mainText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    },
    right: {
      alignItems: 'center'
    }
});

export default CartItem;
