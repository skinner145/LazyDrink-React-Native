import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'

const ListItem = props => {
  return(
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.name}>{props.leftMain}</Text>
        {props.leftSub && (
          <Text style={styles.date}>{props.leftSub}</Text>
        )}
      </View>
      <View style={styles.item}>
        <View style={styles.info}>
        {props.rightMain && (
          <Text style={styles.price}>${props.rightMain.toFixed(2)}</Text>
        )}
          <Icon name="chevron-right" size={30} color={Colors.primary} />
        </View>
        {props.rightSub && (
          <Text style={styles.table}>Table: {props.rightSub}</Text>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: '#ffffff',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular'
  },
  info: {
    flexDirection: 'row'
  },
  price: {
    fontSize: 20,
    fontFamily: 'Roboto-Thin'
  },
  table: {
    fontFamily: 'Roboto-Thin'
  }
})

export default ListItem
