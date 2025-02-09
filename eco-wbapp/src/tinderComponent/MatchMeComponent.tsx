import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ProductDto } from '../EcoWebClient';
import { useApi } from '../apiContext';

interface SwipeCardsProps {
  products: ProductDto[];
  currentProductIndex: number;
  setCurrentProductIndex: React.Dispatch<React.SetStateAction<number>>; // Update current product index
}

const SwipeCards = ({ products, currentProductIndex, setCurrentProductIndex }: SwipeCardsProps) => {

  const apiClient = useApi();

  const handleCardSwipe = async (x: number, productId: string) => {
    if (x > 50) {
      // Right Swipe: Like Product
      const userId = JSON.parse(localStorage.getItem('authUser') || '{}').userId;
      if (!userId) return;

      try {
        const response = await apiClient.likeProduct(productId, userId);
        console.log('response:', response)

        if (response.success) {
          if (response.data.isMatch) {
            console.log('It’s a match!');

            // TODO: get username from ownerId and product name from reverseProductId 
            const reverseProduct = await apiClient.getProductById(response.data.reverseProductId);
            const owner = await apiClient.getUserByFirebaseUid(response.data.ownerId);

            alert(`You’ve matched with ${owner.data.name}, they liked your product: ${reverseProduct.data?.name}`)
          } else {
            console.log('Product liked.');
          }
        } else {
          console.error('Failed to like the product');
        }
      } catch (error) {
        console.error('Error liking product:', error);
      }
    }

    // Move to next product regardless of swipe direction
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  return (
    <div
      style={{
        position: 'relative',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '450px',
        height: '550px',
        margin: 'auto',
      }}
    >
      {products.length > 0 && (
        <CardItem
          key={products[currentProductIndex].id}
          product={products[currentProductIndex]}
          handleCardSwipe={handleCardSwipe}
        />
      )}
    </div>
  );
};

const CardItem = ({
  product,
  handleCardSwipe,
}: {
  product: ProductDto;
  handleCardSwipe: (x: number, productId: string) => void;
}) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const rotate = useTransform(x, [-100, 0, 100], [-18, 0, 18]);

  const handleDragEnd = () => {
    handleCardSwipe(x.get(), product.id);
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'scale(0.85)',
      }}
    >
      <motion.img
        src={product.images[0]} // display 1st image
        alt={product.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
          cursor: 'grab',
          x,
          opacity,
          rotate,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontWeight: 'bold',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '0px 10px',
          borderRadius: '12px',
          fontSize: '40px', // Smaller font size for price
        }}
      >
        ${product.price}
      </motion.div>
    </motion.div>
  );
};

export default SwipeCards;
