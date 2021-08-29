import styled from 'styled-components';
import { darken } from 'polished';

export const ImageContainer = styled.div`
  align-self: center;
  width: 180px;
  height: 180px;
  max-height: 180px;
  max-width: 180px;
`;

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  grid-gap: 20px;
  list-style: none;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 10px;

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
