import { useState, useEffect } from 'react';
import './Canvas.css';
import image from './cart2.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function CartOffCanvas({ cartItems, removeItem }) {

  const navigate = useNavigate();
 const handleProceedToCheckout = () => {
    navigate('/checkout', {
       state: {
      cartItems,
      itemQuantities,
      totalValue: calculateTotalWithTax(),
    }
   });
};

const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setItemQuantities(initialQuantities);
    console.log('show the item ' + cartItems)
  }, [cartItems]);

  const handleIncrement = (itemId) => {
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[itemId] = (prevQuantities[itemId] || 0) + 1;
      return updatedQuantities;
    });
  };

  const handleDecrement = (itemId) => {
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[itemId] = Math.max((prevQuantities[itemId] || 0) - 1, 0);
      if (updatedQuantities[itemId] === 0) {
        removeItem(itemId);
        delete updatedQuantities[itemId];
        toast.dark('Item removed from cart');
      }
      return updatedQuantities;
    });
  };

  const handleRemove = (itemId) => {
    removeItem(itemId);
    toast.dark('Item deleted from the cart');

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });

  };


  const totalPrices = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const quantity = itemQuantities[item.id] || 0;
      totalPrice += item.price * quantity;
    });
    return totalPrice;
  };

  const calculateTotalWithTax = () => {
    const totalPrice = totalPrices();
    const tax = 200;
    return totalPrice + tax;
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            YOUR CART
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="cart-items-list ">
            {cartItems.length ? (
              cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      className="cart-item img"
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                      }}
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-title ">
                        {item.title} -{' '}
                        <span className="cart-item-price">RS: {item.price}</span>
                      </p>
                    </div>
                    <div className="quantity-controls">
                      <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
                      <span className="quantity-value">{itemQuantities[item.id] || 0}</span>
                      <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => handleRemove(item.id)}>x</button>
                  </div>
                </li>
              ))
            ) : (
              <>
                <p className="para">Cart is Empty 😯</p>
                <img src={image} alt="Empty Cart" />
              </>
            )}
          </ul>
          <div className="cart-summary">
            <p className="total-price">Total Price: RS {totalPrices()}</p>
            <p className="tax">Tax: RS 200</p>
            <p className="total-with-tax">
              Total with Tax: RS {calculateTotalWithTax()}
            </p>
          </div>
          <button onClick={handleProceedToCheckout}>proceed to checkout </button>
        </div>
      </div>
    </>
  );
}

export default CartOffCanvas;

