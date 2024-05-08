import React, { useRef, useState, ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Image } from "../../interfaces/works.interfaces";
import { storage } from "../../services/firebase";

interface ImageUploadProp {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  images: Image[];
}

const ImagesUpload: React.FC<ImageUploadProp> = ({ setImages, images }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const filesArray: File[] = Array.from(e.target.files);

      const uploadPromises = filesArray.map(async (file) => {
        const uniqueFileName = `${file.name}_${Date.now()}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const downloadURLs = await Promise.all(uploadPromises);
      const newImages = downloadURLs.map((downloadURL) => ({
        src: downloadURL,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
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

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="image-preview-container">
        {images.map((image, index) => (
          <>
            {!image && !images ? (
              <p>Inga bilder uppladdade</p>
            ) : (
              <div key={index} className="image-preview">
                <img
                  src={image.src}
                  alt={`Bild ${index}`}
                  style={{ width: "100px", height: "auto" }}
                />
                <button
                  className="delete-btn"
                  onClick={(e) => handleDeleteImage(e, index)}
                >
                  Ta bort
                </button>
              </div>
            )}
          </>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        multiple
        disabled={uploading}
        style={{ display: "none" }}
      />
      {error && <p>{error}</p>}
      <div className="upload-btn">
        <button onClick={handleButtonClick} disabled={uploading}>
          {uploading ? "Laddar upp..." : "Ladda upp bild(er)"}
        </button>
      </div>
    </>
  );
};

export default ImagesUpload;
