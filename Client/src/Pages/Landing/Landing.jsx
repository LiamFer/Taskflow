import React, { useContext, useState } from "react";
import styles from "./landing.module.css";
import { themeContext } from "../../Context/themeContext";
import { Button } from "antd";
import CreateBoard from "../../Components/Popups/CreateBoard";

export default function Landing() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useContext(themeContext);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        padding: "15px",
        justifyContent: "center",
        overflow: "auto",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      className={darkMode ? styles.darkContainer : styles.lightContainer}
    >
      <div
        style={{
          maxWidth: "500px",
          gap: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>
          <span style={{ color: "#722ed1" }}>Focus</span> on the work that
          matters
        </h1>
        <p style={{ fontSize: "1.5rem", margin: 0 }}>
          We bring all of your team's content together whilst letting you use
          the tools you love
        </p>
        <div>
          <Button onClick={() => setOpen(true)} type="primary">
            Start a new Board
          </Button>
        </div>
      </div>

      <img
        src="/landing_image.svg"
        alt="Logo"
        style={{ width: "100%", maxWidth: "550px" }}
      />
      <CreateBoard open={open} setOpen={setOpen} />
    </div>
  );
}
