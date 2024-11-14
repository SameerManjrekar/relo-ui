import React from "react";

interface ImageQueueProps {
  images: { id: number; url: string }[];
  currentImage: { id: number; url: string } | null;
  onSelectImage: (image: { id: number; url: string }) => void;
}

const ImageQueue: React.FC<ImageQueueProps> = ({
  images,
  currentImage,
  onSelectImage,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Next images in queue:</h2>
      <div className="flex space-x-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={`w-20 h-16 flex justify-center items-center border cursor-pointer ${
              currentImage?.id === image.id ? "border-blue-500" : ""
            }`}
            onClick={() => onSelectImage(image)}
          >
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageQueue;
