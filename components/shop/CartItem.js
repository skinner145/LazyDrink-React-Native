import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const CartItem = props => {
    let price = props.price;



    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} x </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>€{parsePrice(price)}</Text>
                {props.deletable &&(
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Text>Hey</Text>
                </TouchableOpacity>
                )}
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
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    },

});

export default CartItem;
