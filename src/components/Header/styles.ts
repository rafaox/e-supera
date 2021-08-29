import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 25px 0;
  padding: 25px 20px;
  background-color: #fff;

  a {
    transition: opacity 0.2s;
    color: #e34111;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Cart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #e34111;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
