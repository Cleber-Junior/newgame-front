import styled from "styled-components";

export const HeaderContainer = styled.div`
  font-family: "New Amsterdam";
  letter-spacing: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 1.3rem;
  background-color: #262626;
`;

export const LogoDivision = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
`;

export const SearchDivision = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 50%;
`;

export const UserDivision = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
`;

export const Input = styled.input`
  width: 60%;
  height: 30px;
  border: none;
  border-radius: 10px;
`;

export const Nav = styled.nav`
  font-family: "New Amsterdam";
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-left: 15px;
  margin-right: 10px;
`;

export const Botoes = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  color: #fff;
  margin-left: 20px;
  margin-right: 10px;
  padding: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #1cc24a;
  }
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
`;

export const Logo = styled.img`
  width: 225px;
  height: 57px;
  margin-left: 10px;
`;

export const DropDownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 55px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;
`;

export const DropDownItem = styled.div`
  padding: 10px 15px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;
