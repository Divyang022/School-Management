// Import the necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import LogoutButton from './LogoutButton';

const UpdateTeacherDetails = () => {
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [filteredTeacherDetails, setFilteredTeacherDetails] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    gender: "",
    city: "",
    state: "",
  });

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/getTeacherDetails"
      );
      setTeacherDetails(response.data);
      setFilteredTeacherDetails(response.data);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const handleShowModal = (teacher) => {
    setSelectedTeacher(teacher);
    setUpdatedDetails({
      name: teacher.name,
      gender: teacher.gender,
      city: teacher.city,
      state: teacher.state,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setUpdatedDetails({
      name: "",
      gender: "",
      city: "",
      state: "",
    });
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/updateTeacherDetails/${selectedTeacher.email}`,
        updatedDetails
      );
      console.log(response.data);
      handleCloseModal();
      fetchTeacherDetails();
    } catch (error) {
      console.error("Error updating teacher details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Filter teachers based on the name while typing
    const filteredTeachers = teacherDetails.filter((teacher) =>
      teacher.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTeacherDetails(filteredTeachers);
  };

  return (
    <div className="user-details-container">
      <h1>Teachers Details</h1>

      {/* Search bar for filtering by name */}
      <div>
        <input
          type="text"
          placeholder="Search by Name"
          name="name"
          value={updatedDetails.name}
          onChange={handleChange}
        />
      </div>

      {filteredTeacherDetails.length > 0 ? (
        <div>
          {filteredTeacherDetails.map((teacher) => (
            <div key={teacher.email}>
              <p>Email: {teacher.email}</p>
              <p>Name: {teacher.name}</p>
              <p>Gender: {teacher.gender}</p>
              <p>Type: {teacher.type}</p>
              <p>City: {teacher.city}</p>
              <p>State: {teacher.state}</p>
              <button onClick={() => handleShowModal(teacher)}>
                Update Details
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No matching teacher details found.</p>
      )}

      {/* Modal for updating teacher details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={updatedDetails.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gender"
                name="gender"
                value={updatedDetails.gender}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={updatedDetails.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                name="state"
                value={updatedDetails.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <LogoutButton className="floating-button2" />
    </div>
  );
};

export default UpdateTeacherDetails;
