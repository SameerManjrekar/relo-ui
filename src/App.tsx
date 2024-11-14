import React, { useState } from "react";
import axios from "axios";

import CanvasBox from "./components/CanvasBox";
import CategorySelector from "./components/CategorySelector";
import ImageQueue from "./components/ImageQueue";
import useStore from "./store";
import useApi from "./hooks/useApi";

const App: React.FC = () => {
  const {
    images,
    currentImage,
    setCurrentImage,
    selectedCategory,
    setSelectedCategory,
    canvasBox,
    setCanvasBox,
  } = useStore();
  const { error, fetchImages, fetchCategories } = useApi();
  const [retry, setRetry] = useState(false);

  const handleRetry = async () => {
    setRetry(true);
    await fetchImages();
    await fetchCategories();
    setRetry(false);
  };

  const handleConfirm = () => {
    if (currentImage && selectedCategory) {
      axios
        .post(
          "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations",
          {
            imageId: currentImage.id,
            annotations: [
              {
                categoryId: selectedCategory,
                boundingBoxes: [canvasBox],
              },
            ],
          }
        )
        .then(() => {
          const nextImageIndex = images.indexOf(currentImage) + 1;
          setCurrentImage(images[nextImageIndex] || null);
          setSelectedCategory(null);
          setCanvasBox({
            topLeftX: 0,
            topLeftY: 0,
            width: 0,
            height: 0,
          });
        })
        .catch((error) => {
          console.error("Error submitting annotation:", error);
        });
    }
  };

  const handleDiscard = () => {
    if (currentImage) {
      axios
        .post(
          "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations",
          {
            imageId: currentImage.id,
            annotations: [],
          }
        )
        .then(() => {
          const nextImageIndex = images.indexOf(currentImage) + 1;
          setCurrentImage(images[nextImageIndex] || null);
          setSelectedCategory(null);
          setCanvasBox({
            topLeftX: 0,
            topLeftY: 0,
            width: 0,
            height: 0,
          });
        })
        .catch((error) => {
          console.error("Error discarding annotation:", error);
        });
    }
  };

  if (error) {
    return (
      <div className="p-4 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Image Analyzer</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={retry}
          >
            {retry ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Image Analyzer</h1>

      <div className="flex space-x-6 h-[90vh]">
        <div className="flex-1 bg-black flex justify-center items-center relative rounded-md overflow-scroll">
          {currentImage && (
            <CanvasBox
              imageUrl={currentImage.url}
              canvasBox={canvasBox}
              onUpdateCanvasBox={setCanvasBox}
            />
          )}
        </div>

        <div className="w-1/3 bg-gray-100 p-4 rounded-md overflow-scroll h-full">
          <CategorySelector
            categories={useStore().categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleDiscard}
          className="px-4 py-2 bg-gray-300 text-black rounded border border-gray-400 hover:bg-gray-400"
        >
          Discard
        </button>
        <button
          onClick={handleConfirm}
          className={`px-4 py-2 rounded text-white ${
            canvasBox.width > 0 && selectedCategory
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!canvasBox.width || !selectedCategory}
        >
          Confirm
        </button>
      </div>

      <div className="mt-8 bg-gray-100 p-4 rounded-md">
        <ImageQueue
          images={images}
          currentImage={currentImage}
          onSelectImage={setCurrentImage}
        />
      </div>
    </div>
  );
};

export default App;
