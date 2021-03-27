import React from "react";
import styled from "styled-components";
const Anchor = styled.a`
  font-size: 20px;
  text-shadow: 1px 1px 3px grey;
`;
const Nav = styled.nav`
  background-color: #d8d8d8;
`;
const Container = styled.div`
  margin-bottom: 15px;
`;
function Header() {
  return (
    <Container>
      <Nav className="navbar navbar-light ">
        <Anchor href="/" className="navbar-brand">
          Movie Theater
        </Anchor>
      </Nav>
    </Container>
  );
}

export default Header;
