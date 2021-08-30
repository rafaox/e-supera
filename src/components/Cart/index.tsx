import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md';
import Image from 'next/image';

import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/Product';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }));

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal += (product.amount * product.price);
      }, 0)
    );

  const freight = cart.reduce((sumTotal, product) => { return sumTotal += (product.amount * product.price) }, 0) > 250
    ? formatPrice(0)
    : formatPrice(cart.reduce((sumTotal, product) => {
      return sumTotal += (10 * product.amount);
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => (
            <tr key={product.id}>
              <td>
                <Image src={product.image} alt={product.name} width={100} height={100} />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{formatPrice(product.price)}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>  
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
          <span>FRETE</span>
          <strong>{freight}</strong>
        </Total>
      </footer>
    </Container>
  );
}