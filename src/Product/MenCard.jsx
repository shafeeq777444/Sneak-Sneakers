
import ProductCard from './ProductCard'; // Import the new ProductCard component
import { useContext } from 'react';
import { ProductContext } from './ProductContext';
const MenCard = () => {
  const {menProducts}=useContext(ProductContext)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center mx-auto">
      {menProducts.map(product => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice} // Optional: only if there’s an old price
          image={product.pic}
          description={product.Description} // Optional: include if you need it
        />
      ))}
    </div>
  );
};

export default MenCard;
