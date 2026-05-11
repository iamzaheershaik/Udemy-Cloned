import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { addToCartAsync, getAllCourseAsync, getCartAsync, getMyLearningAsync } from "../../Services/Action/cource.action";
import "./ViewCourses.css";

const ViewCourses = ({ filter }) => {

  const courses = useSelector((state) => state.course.courses);
  const cart = useSelector((state) => state.course.cart);
  const myLearning = useSelector((state) => state.course.myLearning);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get("q") || "").trim().toLowerCase();

  useEffect(() => {
    dispatch(getAllCourseAsync());
    dispatch(getCartAsync());
    dispatch(getMyLearningAsync());
  }, [dispatch]);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === "All" || course.method === filter;
    const searchableText = [
      course.title,
      course.description,
      course.learn,
      course.method,
    ].join(" ").toLowerCase();
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mt-4">

      <Row>
        {filteredCourses.length === 0 && (
          <Col xs={12}>
            <div className="empty-course-state">
              No courses found.
            </div>
          </Col>
        )}

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

                  <p className="course-description mb-1">{course.description || "No description provided."}</p>

                  <p className="course-skills mb-1"><b>Skills:</b> {course.learn || "Not specified"}</p>

                  <p className="mb-1"><b>Duration:</b> {course.duration} hrs</p>

                  <p className="mb-1"><b>Rating:</b> ⭐ {course.rating}</p>

                  <p className="mb-3"><b>Price:</b> ₹{course.price}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      as={Link}
                      to={`/course/${course.id}`}
                      variant="primary"
                      size="sm"
                      disabled={!course.id}
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
