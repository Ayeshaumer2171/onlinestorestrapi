  import { useLocation,useHistory } from 'react-router-dom';
  import { useState } from 'react';
  import './Checkout.css';

   function Checkout() {
  const location = useLocation();
  const { cartItems, itemQuantities, totalValue } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  

  return (
    <div className="checkout-container">
        {orderPlaced ? (
          <h2>Order Placed Successfully</h2>
        ) : (
          <div>
          <div className="cart-summary">
            <h2>Checkout</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.title} - QUANTITY: {itemQuantities[item.id]}
                </li>
              ))}
            </ul>
            <p>Total Price: RS {totalValue}</p>
          </div>
          <div className="checkout-form">

   <form onSubmit={handleSubmit}>
  <h3>Shipping Information</h3>
  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required />
  <textarea
    name="address"
    placeholder="Shipping Address"
    value={formData.address}
    onChange={handleFormChange}
    required
  />
  <button type="submit">Place Order</button>
</form>

</div>

          </div>
         )}
    </div>
  );
      }

export default Checkout;
