import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Article {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const CardsContainer = styled.div`
  padding: 4rem 0;
  display: flex;
`;

const Card = styled.div`
  height: 40rem;
  width: 32%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 25rem;
  border-radius: 2rem;
  object-fit: cover;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const Content = styled.p``;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.p`
  font-size: 2.5rem;
  color: #444;
  margin-bottom: 1rem;
`;

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const { data: response } = await axios.get(
        "http://localhost:8080/api/articles"
      );
      setArticles(response);
    };
    fetchArticles();
  }, []);

  console.log(articles);

  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article._id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoArticlesContainer>
          <ErrorHeader>Please choose the plan to access articles</ErrorHeader>
          <Link to="/article-plans">Buy a plan &gt;</Link>
        </NoArticlesContainer>
      )}
    </Container>
  );
}
