import React, { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ListItem } from 'react-native-elements'
import MainMenuItem from '../../components/shop/MainMenuItem';
import ProductItem from '../../components/shop/ProuctItem';
import ProductDetails from '../../screens/menu/ProductDetails';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import * as typeActions from '../../store/actions/type';
import { TouchableOpacity } from 'react-native-gesture-handler';
const MainMenu = ({navigation}) => {
    const types = useSelector(state => state.type.availableTypes);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(typeActions.getTypes())
    }, [dispatch])








    if(types.length > 0){
        return (<FlatList
            data={types}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu', {drinkType: item.id})}
                >
                    <ListItem title={item.name} bottomDivider chevron />
                </TouchableOpacity>
            )}
            />)
    }
    else{
        return <Text>Hey</Text>
    }

}

export const screenOptions = navData => {
    return{
        headerTitle: 'Main Menu',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu"
                iconName={'md-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}  />
            </HeaderButtons>
            ),
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

export default MainMenu;
