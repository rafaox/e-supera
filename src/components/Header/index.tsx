import Link from 'next/link';

import { useCart } from '../../hooks/useCart';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

export default function Header() {
  const { cart } = useCart();
  const cartSize = cart.filter((value, index, self) => self.indexOf(value) === index).length;

  return (
    <Container>
      <Link href="/">
        <a>
          <h1>e-supera</h1>
        </a>
      </Link>

      <Link href="/cart" passHref={true}>
        <a>
          <Cart>
            <div>
              <strong>Meu carrinho</strong>
              <span>
                {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
              </span>
            </div>
            <MdShoppingBasket size={36} color="#FFF" />
          </Cart>
        </a>
      </Link>
    </Container>
  );
}