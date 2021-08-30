import styled from 'styled-components';
import { darken } from 'polished';

interface OrderButton {
  active: boolean;
}

export const OrderButton = styled.button<OrderButton>`
  border: 0;
  border-radius: 5px;
  background-color: #e34111;
  padding: 5px;
  color: #fff;
  background-color: ${
      props => props.active ? darken(0.06, '#e34111') : darken(0, '#e34111')
  };

  &:hover {
    background: ${darken(0.06, '#e34111')};
  }

  &:nth-child(2) {
    margin: 0 5px;
  }
`;

export const ImageContainer = styled.div`
  align-self: center;
  width: 180px;
  height: 180px;
  max-height: 180px;
  max-width: 180px;
`;

export const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 10px;

  nav {
    margin: 15px 0px;
  }
`;

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #e34111;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#e34111')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
