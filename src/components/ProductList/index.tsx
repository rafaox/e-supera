import { useState, useEffect } from 'react';
import Image from 'next/image';

import { MdAddShoppingCart } from 'react-icons/md';

import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/Product';

import { ImageContainer, ProductListContainer } from './styles';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const sumProduct = (sumAmount[product.id] || 0) + product.amount;
    return {...sumAmount, [product.id]: sumProduct};
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const productsList: ProductFormatted[] = await api.get('/products')
        .then(response => response.data);
        
      productsList.map(product => product.priceFormatted = formatPrice(product.price));
      productsList.sort((a, b) => {
        if ( a.id < b.id ) return -1; 
        if ( a.id > b.id ) return 1;
        return 0;
      })
      setProducts(productsList);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductListContainer>
      {products.map(product => (
        <li key={product.id}>
          <ImageContainer>
            <Image src={product.image} alt={product.name} width={180} height={180} />
          </ImageContainer>
          <strong>{product.name}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductListContainer>
  );
}