import styled from "styled-components";

export const Screen = styled.div`
  font-size: 1.2rem;
`;

export const Nav = styled.nav`
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 10px;
`;

export const Botoes = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  background-color: #000;
  color: #fff;
  margin-right: 10px;
  padding: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Adiciona a transição */
  &:hover {
    background-color: #b9b9b9;
    color: #000;
  }
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
`;
