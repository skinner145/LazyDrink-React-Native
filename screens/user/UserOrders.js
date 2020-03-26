import React from 'react'
import { FlatList } from 'react-native';
import ProductItem from '../../components/shop/ProuctItem';
import { useSelector } from 'react-redux'

const UserOrders = props => {
    const userOrders = useSelector(state => state.order.userOrders)
    return (
        <FlatList 
            data={userOrders}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem />}
        />
    )
}

export default UserOrders;