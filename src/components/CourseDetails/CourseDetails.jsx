import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteCourseAsync, addToCartAsync, getCourseAsync, getCartAsync, getMyLearningAsync } from "../../Services/Action/cource.action";
import { useEffect } from "react";

const CourseDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const cart = useSelector((state) => state.course.cart);
  const myLearning = useSelector((state) => state.course.myLearning);

  const course = courses[id] || courses.find(c => c.id === id || c.id === Number(id));

  useEffect(() => {
    if (!course) {
      dispatch(getCourseAsync(id));
    }
    dispatch(getCartAsync());
    dispatch(getMyLearningAsync());
  }, [dispatch, id, course]);

  if (!course) {
    return <h2 className="text-center mt-5">Course Not Found</h2>;
  }

  const isPurchased = myLearning.some(item => item.id === course.id);
  const isInCart = cart.some(item => item.id === course.id);

  return (

    <Container className="mt-5">

      {/* IMAGE + BASIC DETAILS */}
      <Row className="mb-5">

        <Col md={6}>
          <img
            src={course.image}
            alt={course.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>

        <Col md={6}>

          <h2>{course.title}</h2>

          <p>{course.description}</p>

          <hr />

          <p><b>Price:</b> ₹{course.price}</p>

          <p><b>Method:</b> {course.method}</p>

          <p><b>Duration:</b> {course.duration} hrs</p>

          <p><b>Rating:</b> ⭐ {course.rating}</p>

          <div className="d-flex align-items-center mb-3">
            {isPurchased ? (
              <Button as={Link} to="/my-learning" variant="success" className="me-3">Go to Course</Button>
            ) : isInCart ? (
              <Button as={Link} to="/cart" variant="warning" className="me-3">Go to Cart</Button>
            ) : (
              <Button
                variant="dark"
                className="me-3"
                onClick={() => dispatch(addToCartAsync(course))}
              >
                Add to Cart
              </Button>
            )}
          </div>

          <div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate(`/edit/${course.id}`)}
            >
              Edit
            </Button> &nbsp; &nbsp;
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                dispatch(deleteCourseAsync(course.id));
                navigate("/");
              }}
            >
              Delete
            </Button>
          </div>

        </Col>

      </Row>


      {/* WHAT WILL YOU LEARN SECTION */}

      <Row>

        <Col md={12}>

          <h3>What you'll learn</h3>

          <div style={{
            background: "#f7f9fa",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "10px"
          }}>

            <p>{course.learn}</p>

          </div>

        </Col>

      </Row>

    </Container>

  );
};

export default CourseDetails;