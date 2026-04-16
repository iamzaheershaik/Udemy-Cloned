import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

const CloudinaryUpload = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Final_Project");
    data.append("cloud_name", "djofqmx0j");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djofqmx0j/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await response.json();
      onUploadSuccess(uploadedImage.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Form.Control
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button 
        variant="primary" 
        onClick={uploadImage} 
        disabled={loading || !image}
        style={{ whiteSpace: 'nowrap' }}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-1"
            />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
};

export default CloudinaryUpload;
