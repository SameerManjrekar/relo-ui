import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store";

const useApi = () => {
  const { setImages, setCategories, setCurrentImage } = useStore();
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images"
      );
      setImages(response.data);
      setCurrentImage(response.data[0] || null);
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories"
      );
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  return { error, fetchImages, fetchCategories };
};

export default useApi;
