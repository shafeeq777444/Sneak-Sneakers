import React, { useContext } from "react";
import "./ProductModal.css";
import { CartContext } from "../cart/cartContext";


const ProductModal = ({ isOpen, onClose, product }) => {
    const {addToCart}=useContext(CartContext)
    const handleAddToCart=()=>{
        addToCart(product)
        onClose();
    }
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {product && (
                    <div className="modal-card">
                        <h2 className="modal-name">{product.name}</h2>
                        <img src={product.pic} />
                        <p className="modal-description">{product.description}</p>
                        <h2 className="modal-price">Price: ₹{product.price}</h2>

                        <button onClick={handleAddToCart} className="modal-bag">Add to Bag</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductModal;
