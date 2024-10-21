import styled from "styled-components";
export const Screen = styled.div`
  font-family: "Geo";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
  border: 5px solid black;
  border-radius: 10px;
  background-color: #fff;
`;

export const Divlogo = styled.div`
  margin: 0px;
  text-align: center;
  font-size: 22px;
  color: #2f954b;
`;
export const Logo = styled.img`
  width: 140px;
  height: 120px;
`;
export const Divform = styled.form`
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Label = styled.label`
  display: flex;
  justify-content: start;
  font-size: 18px;
`;
export const Input = styled.input`
  height: 25px;
  margin-bottom: 15px;
  background-color: #d6ffcc;
  border: 1px solid #2f954b;
  border-radius: 5px;
`;
export const Divsign = styled.div`
  margin: 10px;
`;
export const Logar = styled.button`
  font-family: "Geo";
  font-size: 1.5rem;
  width: 70%;
  height: 40px;
  background-color: #2f954b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;

  &:hover {
    background-color: #1f6030;
  }
`;

export const Span = styled.span`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #2f954b;
  cursor: pointer;
  &:hover {
    color: #1f6030;
  }
`;
