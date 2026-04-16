import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getMyLearningAsync } from "../../Services/Action/cource.action";
import { Link } from "react-router-dom";
import "./MyLearning.css";

const MyLearning = () => {
  const myLearning = useSelector((state) => state.course.myLearning);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyLearningAsync());
  }, [dispatch]);

  return (
    <Container className="my-learning-container mt-5">
      <h2 className="mb-4">My Learning</h2>

      {myLearning.length === 0 ? (
        <div className="empty-learning-message text-center p-5 border rounded bg-light">
          <p>You haven't purchased any courses yet.</p>
          <Button as={Link} to="/" variant="primary">Browse Courses</Button>
        </div>
      ) : (
        <Row>
          {myLearning.map((course, index) => (
            <Col lg={3} md={4} sm={6} xs={12} key={course.id || index} className="mb-4">
              <Card className="learning-card h-100">
                <Card.Img
                  variant="top"
                  src={course.image}
                  className="learning-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="learning-title mb-3">
                    {course.title}
                  </Card.Title>
                  <p className="text-muted small mb-3">{course.method}</p>

                  <div className="mt-auto">
                    <Button
                      variant="primary"
                      className="w-100"
                    >
                      Start Course
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyLearning;
