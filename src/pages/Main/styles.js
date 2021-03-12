import styled from 'styled-components';

export const Container = styled.div`
  background: rgb(16, 15, 18);
  height: 100%;

  #cont {
    justify-content: center;
    background: rgb(16, 15, 18);
  }

  button {
    width: 100%;
    margin-top: 10px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    transition: all 200ms ease-in 0s;
    background: rgb(16, 15, 18);
    padding: 12px 15px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(247, 223, 30);
    border-image: initial;
    border-radius: 5px;
  }

  button:hover {
    transition: all 200ms ease-in 0s;
    background: rgb(247, 223, 30);
    color: rgb(16, 15, 18);
  }
`;

export const Header = styled.div`
  @media only screen and (max-width: 400px) {
    img {
      display: none;
    }
  }

  @media only screen and (max-width: 250px) {
    div {
      margin: 5px 0 5px 0 !important;
    }
    h2 {
      font-size: 48px !important;
    }
  }

  div {
    display: flex;
    justify-content: center;
    margin: 20px 0 20px 0;

    img {
      width: 150px;
      margin-bottom: 4px;
    }

    h2 {
      font-size: 89px;
      margin-bottom: 0;
      background-image: linear-gradient(90deg, #fdd000, #e58a00);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
