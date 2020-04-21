import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ListItem from '../../components/UI/ListItem'
import * as typeActions from '../../store/actions/type';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'

const MainMenu = ({navigation}) => {
    const types = useSelector(state => state.type.availableTypes);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadTypes = async () => {
          setIsLoaded(false)
          await dispatch(typeActions.getTypes())
          setIsLoaded(true)
        }
        loadTypes()
    }, [dispatch])

    if(isLoaded){
        return (<FlatList
            data={types}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu', {drinkType: item.id})}
                >
                    <ListItem leftMain={item.name} />
                </TouchableOpacity>
            )}
            />)
    }
    else{
        return (
          <View>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )
    }

}

export const screenOptions = navData => {
    return{
        headerTitle: 'Main Menu',
        headerLeft: () => (
          <View flex={1} justifyContent="center" marginLeft={5}  padding={5}>
            <Icon name="menu"
            size={30}
            color="white"
            marginRight={5}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}  />
          </View>
            ),
        headerRight: () => (
          <View flex={1} justifyContent="center" marginRight={5}  padding={5}>
            <Icon name="shopping-cart"
            size={30}
            color="white"
            marginRight={5}
            onPress={() => {
                navData.navigation.navigate('Cart')
            }}  />
          </View>
        )
    }
}

export default MainMenu;
