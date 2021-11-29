import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 18rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

function ArticlesPlan() {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: plans } = await axios.get(
      "http://localhost:8080/api/subs/prices"
    );
    setPrices(plans.data);
    console.log(plans.data);
  };

  const backgroundColors: any = {
    Basic: "#4ba3c3",
    Standard: "#f9627d",
    Premium: "#07004d",
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:8080/api/subs/session",
      { priceId }
    );
    window.location.href = response.url;
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => (
          <Card
            key={price.id}
            style={{ width: "18rem", marginRight: "2rem" }}
            className="mb-2"
          >
            <CardHeader
              style={{ backgroundColor: backgroundColors[price.nickname] }}
            >
              <PriceCircle>
                <PriceText>${price.unit_amount / 100}</PriceText>
              </PriceCircle>
            </CardHeader>
            <Card.Body style={{ margin: "auto" }}>
              <Card.Title style={{ fontSize: "2rem", margin: "auto" }}>
                {price.nickname}
              </Card.Title>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => createSession(price.id)}
              >
                Buy now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
}

export default ArticlesPlan;
