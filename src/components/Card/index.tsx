import React from "react";
import { Card as AntCard } from "antd";
import styles from "./index.module.scss";
import { IDog } from "../../types";

interface IProps {
  dog: IDog;
}

const Card = ({ dog }: IProps) => (
  <AntCard
    hoverable
    style={{ width: 240 }}
    cover={<img alt={dog.name} src={dog.image} />}
    className={styles.container}
  >
    <AntCard.Meta title={dog.name} />
  </AntCard>
);

export default Card;
