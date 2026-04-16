
import { useState } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./AddCourse.css";
import { useNavigate } from "react-router-dom";
import CloudinaryUpload from "../Upload/CloudinaryUpload";

import { useDispatch } from "react-redux";
import { addCourseAsync } from "../../Services/Action/cource.action";

const AddCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    learn: "",
    duration: "",
    price: "",
    rating: 0,
    method: "",
    image: ""
  });

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newCourse = {
    ...formData,
    id: Date.now()
  };

  dispatch(addCourseAsync(newCourse));
  console.log("Course Added:", newCourse);
  navigate("/");

  setFormData({
    title: "",
    description: "",
    learn: "",
    duration: "",
    price: "",
    rating: 0,
    method: "",
    image: ""
  });
};

  return (
    <Container className="add-course-container">
      <Card className="add-course-card">
        <h2 className="add-course-title">Add New Course</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Course Title</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="title"
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Description</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">What you'll learn</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="learn"
                placeholder="What you'll learn"
                value={formData.learn}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Duration</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                name="duration"
                placeholder="Duration (hours)"
                value={formData.duration}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Price</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Rating</Form.Label>

            <Col sm="10" className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={25}
                  style={{ cursor: "pointer", marginRight: "6px" }}
                  color={star <= formData.rating ? "gold" : "gray"}
                  onClick={() => handleRating(star)}
                />
              ))}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Method</Form.Label>

            <Col sm="10">
              <Form.Check
                type="radio"
                label="Online"
                name="method"
                value="Online"
                checked={formData.method === "Online"}
                onChange={handleChange}
              />

              <Form.Check
                type="radio"
                label="Offline"
                name="method"
                value="Offline"
                checked={formData.method === "Offline"}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">Course Poster</Form.Label>
            <Col sm="10">
              {formData.image ? (
                <div className="mb-2">
                   <img src={formData.image} alt="Course Poster" style={{ width: '150px', borderRadius: '8px' }} />
                   <Button variant="danger" size="sm" className="ms-3" onClick={() => setFormData({...formData, image: ""})}>Remove</Button>
                </div>
              ) : (
                <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, image: url})} />
              )}
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button className="add-course-btn" type="submit">
              Add Course
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddCourse;
