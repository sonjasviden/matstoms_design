import React, { useRef, useState, ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Image } from "../../interfaces/works.interfaces";
import { storage } from "../../services/firebase";

interface ImageUploadProp {
  setFrontImage: React.Dispatch<React.SetStateAction<Image | null>>;
  frontImage: Image | null;
}

const FrontImageUpload: React.FC<ImageUploadProp> = ({
  setFrontImage,
  frontImage,
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const file = e.target.files[0];

      const uniqueFileName = `${file.name}_${Date.now()}`;
      const storageRef = ref(storage, `images/${uniqueFileName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFrontImage({ src: downloadURL });
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log("error");
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFrontImage(null);
  };

  return (
    <>
      <div className="image-preview-container">
        {frontImage && (
          <div className="image-preview">
            <img
              src={frontImage.src}
              alt="Front Image"
              style={{ width: "100px", height: "auto" }}
            />
            <button className="delete-btn" onClick={handleDeleteImage}>
              Ta bort
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        disabled={uploading}
        style={{ display: "none" }}
      />
      {error && <p>{error}</p>}
      <div className="upload-btn">
        <button onClick={handleButtonClick} disabled={uploading}>
          {uploading ? "Laddar upp..." : "Ladda upp bild"}
        </button>
      </div>
    </>
  );
};

export default FrontImageUpload;
