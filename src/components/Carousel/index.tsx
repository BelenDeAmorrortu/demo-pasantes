import React, { useEffect, useState } from "react";
import { Carousel as AntCarousel } from "antd";
import styles from "./index.module.scss";
import { axiosInstance } from "../../services/axiosInstance";

interface IProps {}

const Carousel = ({}: IProps) => {
  const [images, setImages] = useState<string[]>();

  const getImages = async () => {
    try {
      const { data } = await axiosInstance.get("/images/search?limit=10");
      setImages(data.map((i: any) => i.url));
    } catch (errorUseCase: any) {
      console.log({ errorUseCase });
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <AntCarousel autoplay className={styles.container}>
      {images?.map((img, index) => (
        <div key={index}>
          <img src={img} alt={`dog-${index}`} className={styles.image} />
        </div>
      ))}
    </AntCarousel>
  );
};

export default Carousel;
