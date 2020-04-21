import React, { useState, useEffect} from 'react';
import { FlatList, Text, View, TextInput, Modal, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import ListItem from '../../components/UI/ListItem'
import Icon from 'react-native-vector-icons/Feather';



const Menu = ({route, navigation}) => {
    const products = useSelector(state => state.products.availableDrinks);
    const dispatch = useDispatch();
    let drinkId = route.params;

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadDrinks = async () => {
          setIsLoaded(false)
          await dispatch(productsActions.getDrinks(drinkId))
          setIsLoaded(true)
        }
        loadDrinks();
    }, [dispatch])


    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [view, setView] = useState(1);
    let isSelected = false;

    let displayModal = (item) => {
      setView(0.1)
      setSelectedProduct(item)
      setType(item.type.name)
      setPrice(item.price.toFixed(2))
      isSelected = true
      setModalVisible(true)
    }




        let filteredProducts = products.filter(product => {
            return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        if(isLoaded){
          return(
          <View>
            <View opacity={view}>
              <View style={styles.search}>
                <View style={styles.searchIcon}>
                  <Icon name="search" size={20} color={Colors.divider} />
                </View>
                <View style={styles.searchInput}>
                    <TextInput style={styles.searchText} type="text" placeholder="Search" onChangeText={text => setSearch(text)} value={search}/>
                </View>
              </View>
          <FlatList
              data={filteredProducts}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
              <TouchableOpacity onPress={() => {
                displayModal(item)
              }}>
                <ListItem leftMain={item.name} rightMain={item.price} />
              </TouchableOpacity>
              }
              />
              </View>
              <Modal visible={modalVisible} transparent={true}>
                <View style={styles.screen}>
                  <View style={styles.container}>
                    <View style={styles.header}>
                      <View marginLeft={-10} marginRight={2}>
                        <Icon
                          name="arrow-left"
                          size={25}
                          onPress={() => {
                            setView(1)
                            setModalVisible(false)
                          }} />
                      </View>
                      <Text style={styles.title}>{selectedProduct.name}</Text>
                    </View>
                    <View style={styles.information}>
                      <View>
                        <Text>{type}</Text>
                      </View>
                      <View style={styles.priceView}>
                        <Text style={styles.price}>${price}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                        setModalVisible(false)
                        setView(1)
                      }}
                      >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>
              )
        }
        else{
            return (
              <View style={styles.screen}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            )
        }


}


export const screenOptions = navData => {

    return{
        headerTitle: 'Menu',
        headerRight: () => (
          <View flex={1} justifyContent="center" marginRight={5} padding={5}>
            <Icon name="shopping-cart"
            size={30}
            color="white"
            marginRight={5}
            onPress={() => {
                navData.navigation.navigate('Cart')
            }}  />
          </View>
        ),
    }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 26
  },
  price:{
      fontSize: 18,
      fontFamily: 'Roboto-Thin'
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    color: 'white',
    elevation: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  priceView: {
    flexDirection: 'column-reverse',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  search: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  searchText: {
    fontSize: 16
  },
  searchInput: {
    flex: 1
  },
  searchIcon: {
    padding: 5
  }
})

export default Menu;
