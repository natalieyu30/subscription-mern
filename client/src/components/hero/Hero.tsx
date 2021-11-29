import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../modal/Modal";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 70vh;
  background: url("https://images.pexels.com/photos/617967/pexels-photo-617967.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1920")
    center center/cover no-repeat;
`;

const HeaderContainer = styled.div`
  background-color: #ddd;
  opacity: 0.85;
  padding: 3rem;
  width: 30rem;
`;

const Heading = styled.h1`
  color: green;
  font-size: 3rem;
`;
const SubHeading = styled.h3`
  color: #444;
  margin: 1rem 0;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.4;
`;

export default function Hero() {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn, and become more successful by reading some of the top
            articles by highly reputable individuals
          </SubHeading>
          <ModalComponent
            text="Signup"
            variant="success"
            size="lg"
            isSignupFlow={true}
          />
          <ModalComponent
            text="Login"
            variant="light"
            size="lg"
            isSignupFlow={false}
          />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
}
