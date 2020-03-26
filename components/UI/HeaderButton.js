import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = props =>{
    return <HeaderButton {...props} iconSize={30} color={'white'} />
}

export default CustomHeaderButton;
