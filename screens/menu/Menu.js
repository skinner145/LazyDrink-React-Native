import React, { useState, useEffect} from 'react';
import { FlatList, Text, View, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProuctItem';
import ProductDetails from '../../screens/menu/ProductDetails';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'

const Menu = ({route, navigation}) => {
    const products = useSelector(state => state.products.availableDrinks);
    const dispatch = useDispatch();
    let drinkId = route.params;
    useEffect(() => {
        dispatch(productsActions.getDrinks(drinkId))
    }, [dispatch])
    const [search, setSearch] = useState('');

    // const handleChange = e => {

    //     setSearch(e.target.value)
    //     console.log(search);

    // }

    if(products.length > 0){
        let filteredProducts = products.filter(product => {
            return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })

        return (
        <View>
            <View>
                <TextInput type="text" placeholder="Search" onChangeText={text => setSearch(text)} value={search}/>
            </View>
        <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => {
              navigation.navigate('ProductDetails',
              {productId: item.id, name: item.name}
              )
            }}>
              <ListItem title={item.name} badge={{value: "$" + item.price.toFixed(2)}} bottomDivider chevron />
            </TouchableOpacity>
            }
            />
            </View>
            )
    }
    else{
        return <Text>Hey</Text>
    }

}

export const screenOptions = navData => {
    return{
        headerTitle: 'All Products',
        // headerLeft: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Menu"
        //         iconName={'md-menu'}
        //         onPress={() => {
        //             navData.navigation.toggleDrawer();
        //         }}  />
        //     </HeaderButtons>
        //     ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="cart"
            iconName={'md-cart'}
            onPress={() => {
                navData.navigation.navigate('Cart')
            }}  />
        </HeaderButtons>
        )
    }
}

export default Menu;
