import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform, FlatList } from 'react-native'

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }


    return(
        <View style={styles.container}>
        <TouchableCmp onPress={props.onViewDetail} useForeGround>
            
                <View style={styles.product}>
                    <Text>{props.name}</Text>    
                </View>
            
        </TouchableCmp>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    product: {
        width: '80%',
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        padding: 10,
        margin: 10,
        overflow: 'hidden'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default ProductItem;