import React from "react";
import { Button } from "react-bootstrap";
interface ButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  color?: string;
  onClick?: () => void;
  style?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const ButtonComp: React.FC<ButtonProps> = ({
  label,
  variant,
  color,
  onClick,
  style,
  type,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      style={{ backgroundColor: color, ...style }}
      {...props}
      disabled
      type={type}
    >
      {label ? label : "Submit"}
    </Button>
  );
};
export default ButtonComp;
