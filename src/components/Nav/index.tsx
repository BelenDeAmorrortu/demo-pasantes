import React from "react";
import { Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Search from "../Search";

const Nav = () => (
  <Menu mode="horizontal" className={styles.container}>
    <Menu.Item key="logo" className={styles.logo}>
      DogAPI
    </Menu.Item>
    <Menu.Item key="search" className={styles.search}>
      <Search placeholder="Search breeds" enterButton={<SearchOutlined />} />
    </Menu.Item>
  </Menu>
);

export default Nav;
