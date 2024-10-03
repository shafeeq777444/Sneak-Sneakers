import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { CartContext } from './cartContext';
import PaymentPopup from './PaymentPopup'; // Import the PaymentPopup component
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false); // State to control payment popup visibility

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Formik setup for address
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      address: '',
      pincode: '',
    },
    onSubmit: (values) => {
      console.log('Address values:', values);
      setShowPayment(true); // Show payment details form upon successful address submission
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.mobile) {
        errors.mobile = 'Required';
      } else if (!/^\d{10}$/.test(values.mobile)) {
        errors.mobile = 'Invalid mobile number';
      }
      if (!values.address) {
        errors.address = 'Required';
      }
      if (!values.pincode) {
        errors.pincode = 'Required';
      } else if (!/^\d{6}$/.test(values.pincode)) {
        errors.pincode = 'Invalid pincode';
      }
      return errors;
    },
  });

  return (
    <div className="flex p-6 bg-white shadow-md rounded-md">
      {/* Left side - Cart Items */}
      <div className="flex-1 pr-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, ind) => (
              <li key={ind} className="flex items-center space-x-4 border-b pb-4">
                <img src={item.pic} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className={`px-2 py-1 text-lg font-bold border rounded-md ${item.quantity === 1 ? 'text-gray-400' : 'text-gray-700'}`}
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-lg font-bold text-gray-700 border rounded-md"
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-2xl"
                  onClick={() => removeItem(item.name)}
                >
                  <img className='remove-button' src='/assets/extra/remove.png' alt="Remove" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right side - Checkout Form */}
      <div className="w-64 bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <p className="text-gray-500">Total Price:</p>
        <h2 className="text-2xl font-bold">₹{totalPrice}</h2>

        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="mobile" className="block text-sm font-medium">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="pincode" className="block text-sm font-medium">Pincode</label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <div className="text-red-500 text-sm">{formik.errors.pincode}</div>
            ) : null}
          </div>

          <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Payment Popup */}
      {showPayment && (
        <PaymentPopup onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
};

export default Cart;
