import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import product from '../pages/product/[slug]';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [carItems, setCarItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onRemove = (product)=>{
        foundProduct = carItems.find((item) => item._id === product._id);
        const newCartItems = carItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity );
        setCarItems(newCartItems);
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = carItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevQuantities) => prevQuantities + quantity);
        if (checkProductInCart) {
            const updateCartItems = carItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            });
            setCarItems(updateCartItems);
        } else {
            product.quantity = quantity;
            setCarItems([...carItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = carItems.find((item) => item._id === id);
        index = carItems.findIndex((product) => product._id === id);

        const newCartItems = carItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            setCarItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCarItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice  - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const descQty = () => {
        setQty((prevQty) => prevQty - 1 < 1 ? 1 : prevQty - 1)
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            carItems,
            setCarItems,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            qty,
            incQty,
            descQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);