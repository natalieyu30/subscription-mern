import { useState, useContext } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const ErrorMessage = styled.p`
  color: red;
  display: block;
  margin-top: 1.5rem;
`;

interface ModalProps {
  text: string;
  variant: string;
  size: "sm" | "lg";
  isSignupFlow: boolean;
}

const ModalComponent = ({ text, variant, size, isSignupFlow }: ModalProps) => {
  const [state, setState] = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMgs] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    let response;

    if (isSignupFlow) {
      const { data: signupData } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        { email, password }
      );
      response = signupData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      response = loginData;
    }

    if (response.errors.length) {
      return setErrorMgs(response.errors[0].msg);
    }

    setState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
        customerStripeId: response.data.user.customerStripeId,
      },
      loading: false,
      error: null,
    });
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${response.data.token}`;
    navigate("/articles");
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size={size}
        style={{
          marginRight: "1rem",
          padding: "0.5rem 3rem",
          marginTop: "1.5rem",
        }}
      >
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text.toUpperCase()}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="my-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
