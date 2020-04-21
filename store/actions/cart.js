

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product, size) => {
    return { type: ADD_TO_CART, product: product};
}

export const drinkSize = size => {
    return{ type: ADD_TO_CART, size: size}
}


export const removeFromCart = productId => {
    return { type: REMOVE_FROM_CART, pid: productId };
};
