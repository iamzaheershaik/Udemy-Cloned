import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import {
  deleteCourseAsync,
  addToCartAsync,
  getCourseAsync,
  getCartAsync,
  getMyLearningAsync,
} from "../../Services/Action/cource.action";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.courses);
  const selectedCourse = useSelector((state) => state.course.course);
  const cart = useSelector((state) => state.course.cart);
  const myLearning = useSelector((state) => state.course.myLearning);
  const error = useSelector((state) => state.course.error);

  const [isLoading, setIsLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const course = useMemo(() => {
    const listCourse = courses.find((item) => String(item.id) === String(id));
    if (listCourse) return listCourse;
    if (selectedCourse && String(selectedCourse.id) === String(id)) return selectedCourse;
    return null;
  }, [courses, id, selectedCourse]);

  useEffect(() => {
    let active = true;

    const loadCourse = async () => {
      if (course) return;
      setIsLoading(true);
      try {
        await dispatch(getCourseAsync(id));
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadCourse();
    dispatch(getCartAsync());
    dispatch(getMyLearningAsync());

    return () => {
      active = false;
    };
  }, [dispatch, id, course]);

  const handleAddToCart = async () => {
    setActionError("");
    try {
      await dispatch(addToCartAsync(course));
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDelete = async () => {
    setActionError("");
    try {
      await dispatch(deleteCourseAsync(course.id));
      navigate("/");
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (isLoading) {
    return <h2 className="text-center mt-5">Loading course...</h2>;
  }

  if (!course) {
    return <h2 className="text-center mt-5">Course Not Found</h2>;
  }

  const isPurchased = myLearning.some((item) => item.id === course.id);
  const isInCart = cart.some((item) => item.id === course.id);

  return (
    <Container className="course-details">
      {(actionError || error) && (
        <Alert variant="danger" className="mb-4">
          {actionError || error}
        </Alert>
      )}

      <Row className="course-detail-layout">
        <Col lg={7}>
          <img
            src={course.image}
            alt={course.title}
            className="course-detail-image"
          />
        </Col>

        <Col lg={5}>
          <div className="course-detail-panel">
            <p className="course-detail-method">{course.method || "Course"}</p>
            <h1>{course.title}</h1>
            <p className="course-detail-description">{course.description}</p>

            <div className="course-detail-meta">
              <span><b>Duration:</b> {course.duration || 0} hrs</span>
              <span><b>Rating:</b> {course.rating || 0}/5</span>
            </div>

            <p className="course-detail-price">₹{course.price || 0}</p>

            <div className="course-detail-actions">
              {isPurchased ? (
                <Button as={Link} to="/my-learning" variant="success">
                  Go to Course
                </Button>
              ) : isInCart ? (
                <Button as={Link} to="/cart" variant="warning">
                  Go to Cart
                </Button>
              ) : (
                <Button variant="dark" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}

              <Button
                variant="outline-primary"
                onClick={() => navigate(`/edit/${course.id}`)}
              >
                Edit
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <section className="learn-section">
        <h2>What you'll learn</h2>
        <div className="learn-box">
          <p>{course.learn || "Learning outcomes have not been added yet."}</p>
        </div>
      </section>
    </Container>
  );
};

export default CourseDetails;
