import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeacherAsync, deleteTeacherAsync } from "../../../Services/Action/teacher.action";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Instructors.css";

const ViewInstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const instructors = useSelector((state) => state.teacher.teachers);
    const error = useSelector((state) => state.teacher.error);

    useEffect(() => {
        dispatch(getAllTeacherAsync());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            try {
                await dispatch(deleteTeacherAsync(id));
            } catch {
                // Error is shown from Redux state below.
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-instructor/${id}`);
    };

    const handleView = (id) => {
        navigate(`/instructor/${id}`);
    };

    return (
        <div className="instructor-table-container">
            <h2 className="text-center">Instructor List</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <Table className="instructor-table" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profession</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {instructors && instructors.length > 0 ? (
                        instructors.map((item, index) => (
                            <tr key={item.id}>
                                <td data-label="#">{index + 1}</td>

                                <td data-label="Image">
                                    <img
                                        src={item.profileImage || "https://via.placeholder.com/45"}
                                        alt="profile"
                                        className="instructor-profile-img"
                                    />
                                </td>

                                <td data-label="Name">
                                    {item.firstName} {item.lastName}
                                </td>

                                <td data-label="Email">{item.email}</td>
                                <td data-label="Phone">{item.phnumber}</td>
                                <td data-label="Profession">{item.profession}</td>
                                <td data-label="Skills">{item.skills}</td>

                                <td data-label="Actions">
                                    <button
                                        className="action-btn view"
                                        title="View"
                                        onClick={() => handleView(item.id)}
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        className="action-btn edit"
                                        title="Edit"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        title="Delete"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="no-instructor-row">
                            <td colSpan="8" className="text-center">
                                No Instructors Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewInstructor;
