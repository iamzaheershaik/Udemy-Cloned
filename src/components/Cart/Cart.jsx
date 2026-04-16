import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { removeFromCartAsync, purchaseCoursesAsync, getCartAsync } from "../../Services/Action/cource.action";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.course.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(purchaseCoursesAsync(cart));
    navigate("/my-learning");
  };

  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);
  return (
    <Container className="cart-container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <p><b>{cart.length}</b> Course{cart.length !== 1 ? 's' : ''} in Cart</p>

      {cart.length === 0 ? (
        <div className="empty-cart-message text-center p-5 border rounded bg-light">
          <p>Your cart is empty. Keep shopping to find a course!</p>
          <Button as={Link} to="/" variant="primary">Keep Shopping</Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cart.map((item) => (
              <Card className="cart-item-card mb-3" key={item.id}>
                <Card.Body className="d-flex align-items-sm-center flex-column flex-sm-row">
                  <img src={item.image} alt={item.title} className="cart-item-img me-sm-3 mb-3 mb-sm-0" />
                  <div className="flex-grow-1">
                    <h5>{item.title}</h5>
                    <p className="mb-1 text-muted small">{item.method}</p>
                    <p className="mb-0 fw-bold">₹{item.price}</p>
                  </div>
                  <div className="ms-sm-auto mt-3 mt-sm-0 text-sm-end">
                    <Button 
                      variant="link" 
                      className="text-danger p-0 text-decoration-none"
                      onClick={() => dispatch(removeFromCartAsync(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <Card className="checkout-card p-4">
              <h4 className="text-secondary mb-3">Total:</h4>
              <h2 className="fw-bold mb-4 d-flex align-items-center">₹{totalPrice}</h2>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100" 
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
