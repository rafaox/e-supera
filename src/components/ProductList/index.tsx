import { useState, useEffect } from 'react';
import Image from 'next/image';

import { TiSortAlphabetically } from 'react-icons/ti';
import { GiPriceTag, GiStarsStack } from 'react-icons/gi';
import { MdAddShoppingCart } from 'react-icons/md';

import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/Product';

import { ImageContainer, OrderButton, ProductListContainer, Wrapper } from './styles';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();
  const [name, setName] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [score, setScore] = useState<boolean>(false);

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
        if ( a.name < b.name ) return -1; 
        if ( a.name > b.name ) return 1;
        return 0;
      });
      setProducts(productsList);
      setName(true);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  function orderController(format: string) {
    const productList = products.slice();

    if (format === 'name') {
      productList.sort((a, b) => {
        if ( a.name < b.name ) return -1; 
        if ( a.name > b.name ) return 1;
        return 0;
      });
      setName(true);
      setPrice(false);
      setScore(false)
    }
    else if (format === 'price') {
      productList.sort((a, b) => {
        if ( a.price < b.price ) return -1; 
        if ( a.price > b.price ) return 1;
        return 0;
      });
      setName(false);
      setPrice(true);
      setScore(false)
    }
    else {
      productList.sort((a, b) => {
        if ( a.score < b.score ) return -1; 
        if ( a.score > b.score ) return 1;
        return 0;
      });
      setName(false);
      setPrice(false);
      setScore(true)
    }

    setProducts(productList);
  }

  return (
    <Wrapper>
      <nav>
        <OrderButton active={name}>
          <TiSortAlphabetically size={32} color="#FFF" onClick={() => orderController('name')} />
        </OrderButton>
        <OrderButton active={price}>
          <GiPriceTag size={32} color="#FFF" onClick={() => orderController('price')} />
        </OrderButton>
        <OrderButton active={score}>
          <GiStarsStack size={32} color="#FFF" onClick={() => orderController('score')} />
        </OrderButton>
      </nav>

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
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductListContainer>
    </Wrapper>
  );
}