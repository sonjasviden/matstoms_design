import { SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { LoginCredentials } from "../interfaces/login.interface";

const Login = () => {
  const { login, currentUser } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      navigate("/admin/all-works");
    }
  }, [currentUser, navigate]);

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
    } catch (error) {
      console.error("Login failed. Please check your credentials.");
      setError("Inloggning misslyckades. Kolla inloggningsuppgifterna.");
    }
    setLoading(false);
  };
  return (
    <div className="login-page">
      <Container className="py-3 center-y">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="p-0">
            <Card>
              <Card.Body>
                {error && (
                  <div>
                    <Alert variant="danger">{error}</Alert>
                  </div>
                )}
                <Card.Title className="mb-3">Logga in (admin)</Card.Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formEmail" className="formgroup">
                    <Form.Label>E-postadress</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", {
                        required: "Skriv in e-postadress",
                      })}
                    />
                    {errors.email && (
                      <Alert variant="danger">{errors.email.message}</Alert>
                    )}
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicPassword"
                    className="formgroup"
                  >
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password", {
                        required: "Skriv in lösenord",
                      })}
                    />
                    {errors.password && (
                      <Alert variant="danger">{errors.password.message}</Alert>
                    )}
                  </Form.Group>

                  <Button
                    disabled={loading}
                    variant="outline-dark"
                    type="submit"
                    className="my-3"
                  >
                    {loading ? "Loggar in..." : "Logga in"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
