import React from 'react';
import { useFormik } from 'formik';

const PaymentPopup = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      upiId: '', // Only UPI field
    },
    onSubmit: (values) => {
      console.log('Payment details:', values);
      // Handle payment processing here
      onClose(); // Close the popup after submission
    },
    validate: (values) => {
      const errors = {};
      if (!values.upiId) {
        errors.upiId = 'Required';
      } else if (!/^[\w.-]+@[a-zA-Z]{2,}$/.test(values.upiId)) {
        errors.upiId = 'Invalid UPI ID';
      }
      return errors;
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* UPI ID Field */}
          <div className="mb-2">
            <label htmlFor="upiId" className="block text-sm font-medium">UPI ID</label>
            <input
              id="upiId"
              name="upiId"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.upiId}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formik.touched.upiId && formik.errors.upiId ? (
              <div className="text-red-500 text-sm">{formik.errors.upiId}</div>
            ) : null}
          </div>

          <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Pay Now
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-red-500">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentPopup;
