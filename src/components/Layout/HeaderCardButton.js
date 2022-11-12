import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CartContext);

  const  [btnIsHighLighted, setBtnIsHighLighted ] = useState(false);
  const { items } = cartCtx;

  useEffect(() => {
    if (cartCtx.items.length === 0){
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() =>{
        setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [cartCtx.items]);

  const numberOfCartItems = items.reduce((curNumber, item) =>{
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump: ''}`

  return (
    <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>
      {numberOfCartItems}
    </span>
    </button>
  )
}

export default HeaderCardButton;
