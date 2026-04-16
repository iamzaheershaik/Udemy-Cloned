import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCartAsync, getAllCourseAsync, getCartAsync, getMyLearningAsync } from "../../Services/Action/cource.action";
import "./ViewCourses.css";

const ViewCourses = ({ filter }) => {

  const courses = useSelector((state) => state.course.courses);
  const cart = useSelector((state) => state.course.cart);
  const myLearning = useSelector((state) => state.course.myLearning);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourseAsync());
    dispatch(getCartAsync());
    dispatch(getMyLearningAsync());
  }, [dispatch]);

  const filteredCourses = filter === "All" 
    ? courses 
    : courses.filter(course => course.method === filter);

  return (
    <div className="container mt-4">

      <Row>

        {filteredCourses.map((course, index) => {
          
          const isPurchased = myLearning.some(item => item.id === course.id);
          const isInCart = cart.some(item => item.id === course.id);

          return (
            <Col lg={3} md={4} sm={6} xs={12} key={course.id || index} className="mb-4">

              <Card className="course-card">

                <Card.Img
                  variant="top"
                  src={course.image}
                  className="course-img"
                />

                <Card.Body className="course-body">

                  <Card.Title className="course-title">
                    {course.title}
                  </Card.Title>

                  <p className="mb-1">{course.description.slice(0, 40)}...</p>

                  <p className="mb-1"><b>Skills:</b> {course.learn ? course.learn.slice(0, 30) : ""}...</p>

                  <p className="mb-1"><b>Duration:</b> {course.duration} hrs</p>

                  <p className="mb-1"><b>Rating:</b> ⭐ {course.rating}</p>

                  <p className="mb-3"><b>Price:</b> ₹{course.price}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      as={Link}
                      to={`/course/${courses.indexOf(course)}`}
                      variant="primary"
                      size="sm"
                    >
                      View More
                    </Button>

                    {isPurchased ? (
                      <span className="badge bg-success" style={{ padding: '8px' }}>Purchased</span>
                    ) : isInCart ? (
                      <Button as={Link} to="/cart" variant="warning" size="sm">
                        In Cart
                      </Button>
                    ) : (
                      <Button 
                        variant="dark" 
                        size="sm"
                        onClick={() => dispatch(addToCartAsync(course))}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>

                </Card.Body>

              </Card>

            </Col>
          );
        })}

      </Row>

    </div>
  );
};

export default ViewCourses;