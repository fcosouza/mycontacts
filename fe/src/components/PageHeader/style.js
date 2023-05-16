import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 16px;
  a{
    text-decoration: none;
    display: flex;

    span{
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img{
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1{
    font-size: 24px;
  }

`;
