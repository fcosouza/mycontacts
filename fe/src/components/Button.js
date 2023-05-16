import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  padding: 0 16;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 4px;
  border: none;
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 0 16px;
  font-size: 16px;
  color: #fff;
  transition: background 0.2s ease-in;

  &:hover{
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active{
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled]{
    background: #CCC;
    cursor: default;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover{
    background: ${theme.colors.danger.light};
    }

    &:active{
      background: ${theme.colors.danger.dark};
    }

  `}
`;
