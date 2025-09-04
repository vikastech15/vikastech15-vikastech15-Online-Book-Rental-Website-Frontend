

const ImageUploader = ({images, setImages}) => {
  // const [files, setFiles] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = [...e.target.files];

    if (selectedFiles.length > 3) {
      alert("You can only upload up to 4 images.");
      setImages(selectedFiles.slice(0, 3));
    } else {
      setImages(selectedFiles);
    }
  };

  return (
    <div className="my-4">
      <input
        type="file"
        multiple
        accept="image/*"
        className="border-2 border-gray-400  rounded-md p-2"
        onChange={handleImageChange}
      />

      {/* Image Thumbnails */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {images.length > 0 &&
          images.map((file, index) => (
            <div key={index} className="w-24 h-24 relative border rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
