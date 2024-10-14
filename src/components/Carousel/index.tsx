import React, { useEffect } from "react";
import { Carousel as AntCarousel } from "antd";
import styles from "./index.module.scss";
import { DogUseCases } from "../../use-cases/DogUseCases";
import { GlobalStateService } from "../../store/GlobalStateService";

interface IProps {}

const Carousel = ({}: IProps) => {
  const images = GlobalStateService.getRandomImages();

  useEffect(() => {
    DogUseCases.retrieveRandomImages();
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
