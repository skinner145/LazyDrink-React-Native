//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import React from 'react';
import { View, Text } from 'react-native';
import * as cartActions from '../../store/actions/cart';
import { useSelector, useDispatch } from 'react-redux';

import { RadioButton } from 'react-native-paper';
 


class DrinkForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            checked: 'first'
        }
    }

    render() {
        
        const { checked } = this.state;
        let sizes = this.props.sizes;
        let value1 = sizes[0].size;
        let value2 = sizes[1].size;
        let price;
        if(this.state.checked === 'first'){
            price = sizes[0].price
        }
        else{
            price = sizes[1].price
        }

        return (
          <View>
              <View>
                  <RadioButton.Group>
                  <Text>yep</Text>
                  <RadioButton.Item
              value="first"
              label={value1}
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ checked: 'first' }); }}
            />
                  </RadioButton.Group>   
              </View>
              <View>
                  <RadioButton.Group>
                  <RadioButton.Item
              value="second"
              label={value2}
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ checked: 'second' }); }}
            />
                  </RadioButton.Group>
              </View>
              <View>
                  <Text>
                      {price.toFixed(2)}
                  </Text>
              </View>
          </View>
        );
      }
}

//     selectSize(){
//         return (
//             (value) => {this.setState({value: value})}
//             )
//     }
  
//     render() {
//         const dispatch = useDispatch;
//         let sizes = this.props.sizes
//         let newSizes = []
//         for(const key in sizes){         
//             newSizes.push({'label': sizes[key].size, "value": sizes[key].price})
//         }
//         console.log(newSizes);
        
//         return(
//             <View>
//                 <RadioForm
//                     radio_props={newSizes}
//                     initial={0}
//                     onPress={this.selectSize()}
//                     onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
//                     />
//                     <Text>Price: €{this.state.value.toFixed(2)}</Text>
//             </View>
//         )
//     }
// }

export default DrinkForm