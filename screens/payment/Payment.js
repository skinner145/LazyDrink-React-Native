import React, { Component, useCallback } from 'react';
import { View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import {
  SQIPCore,
  SQIPCardEntry,

} from 'react-native-square-in-app-payments';
import chargeCardNonce from '../../charge/ChargeCard';
import { Alert } from 'react-native'
import SyncStorage from 'sync-storage';
import * as ordersActions from '../../store/actions/orders'
import * as navigationActions from '../../store/actions/navigation';
import addOrder from './paymentComplete';



const Payment = ({navigation}) => {

    const dispatch = useDispatch()
    const order = useSelector(state => {
      return state.orders.storedOrder
    })
    const userId = useSelector(state => {
      return state.auth.userId
    })
  let onStartCardEntry = () => {
    onCardNonceRequestSuccess = onCardNonceRequestSuccess.bind(this);
    const cardEntryConfig = {
      collectPostalCode: false,
    };
     SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      onCardNonceRequestSuccess,
      onCardEntryCancel,
    );
  }

  let onCardEntryComplete = () => {
    dispatch(ordersActions.addOrder(order, userId))
    Alert.alert('Order successful');
    navigation.navigate('MainMenu')
    // navigation.navigate('Orders')

  }

   let onCardNonceRequestSuccess = async (cardDetails) => {
      // const price = useSelector(state => state.cart.totalPrice);
      let price = order.totalPrice
      price = price * 100;
      try {
        await chargeCardNonce(cardDetails.nonce, price);
        SQIPCardEntry.completeCardEntry(() => {
          // Alert.alert('Order successful')
          onCardEntryComplete()
        })
        // take payment with the card details
        // await chargeCard(cardDetails);

        // payment finished successfully
        // you must call this method to close card entry
        // console.log(cardDetails);
        // await SQIPCardEntry.completeCardEntry(
        //   this.onCardEntryComplete(),
        // );
      } catch (ex) {
        // payment failed to complete due to error
        // notify card entry to show processing error
        await SQIPCardEntry.showCardNonceProcessingError(ex.message);
      }
    }

      let onCardEntryCancel = () => {
      // Handle the cancel callback
    }

    return (

      <View>
        <Button
          onPress={() => {onStartCardEntry()}}
          title="Start Card Entry"
        />
      </View>
    );
}


// export const OnCardEntryComplete = () => {
//   // console.log(cardcom);
// //   return(// Update UI to notify user that the payment flow is completed
//   const dispatch = useDispatch()
// //   dispatch(navigationActions.navigate('Orders'))
// // )
//   // this.props.navigation.navigate('Orders', {success: true});
//   }




  /**
   * Callback when card entry is cancelled and UI is closed
   */


  /**
   * An event listener to start card entry flow
   */


export default Payment;
