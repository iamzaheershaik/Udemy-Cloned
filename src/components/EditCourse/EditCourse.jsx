import { useState, useEffect } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateCourseAsync, getCourseAsync } from "../../Services/Action/cource.action";
import "../AddCourse/AddCourse.css";
import CloudinaryUpload from "../Upload/CloudinaryUpload";

const EditCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const courses = useSelector((state) => state.course.courses);

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        learn: "",
        duration: "",
        price: "",
        rating: 0,
        method: "",
        image: ""
    });

    useEffect(() => {
        dispatch(getCourseAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        const selectedCourse = courses.find(c => c.id === id || c.id === Number(id));
        if (selectedCourse) {
            setFormData(selectedCourse);
        }
    }, [id, courses]);

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

        dispatch(updateCourseAsync(formData));
        navigate("/");
    }
    return (

        <Container className="add-course-container">
            <Card className="add-course-card">

                <h2 className="add-course-title">Edit Course</h2>

                <Form onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Course Title</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="title"
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
                            Update Course
                        </Button>

                    </div>

                </Form>

            </Card>
        </Container>

    );

};

export default EditCourse;