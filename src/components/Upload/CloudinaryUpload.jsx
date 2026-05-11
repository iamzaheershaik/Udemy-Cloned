import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

const CloudinaryUpload = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "djofqmx0j";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "Final_Project";

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await response.json();
      if (!response.ok || !uploadedImage.secure_url) {
        throw new Error(uploadedImage.error?.message || "Image upload failed.");
      }
      onUploadSuccess(uploadedImage.secure_url);
    } catch (error) {
      setError(error.message || "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-control">
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button 
          variant="primary" 
          onClick={uploadImage} 
          disabled={loading || !image}
          className="upload-button"
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
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

export default CloudinaryUpload;
