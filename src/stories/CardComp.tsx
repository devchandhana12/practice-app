import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
interface CardCompProps {
  children: ReactNode;
}

const CardComp: React.FC<CardCompProps> = ({ children }) => {
  return (
    <Card
      className={" shadow-lg text-white "}
      style={{
        backgroundColor: "#272829",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardComp;

CardComp.propTypes = {
  children: PropTypes.any.isRequired,
};
