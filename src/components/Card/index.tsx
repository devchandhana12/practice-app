import React, { ReactNode, CSSProperties } from "react";
import { Card } from "react-bootstrap";

interface CardCompProps {
  children: ReactNode;
  style?: CSSProperties;
}

const CardComp: React.FC<CardCompProps> = ({ children, style }) => {
  return (
    <Card
      className={" shadow-lg text-white "}
      style={{
        backgroundColor: "#272829",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardComp;
