import React from "react";
import { Button, ButtonProps as BootstrapButtonProps } from "react-bootstrap";

interface ButtonProps extends BootstrapButtonProps {
  label?: string | number;
  color?: string;
  testId?: string;
}

const ButtonComp: React.FC<ButtonProps> = ({
  label,
  variant,
  color,
  style,
  type,
  disabled,
  onClick,
  testId,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick} // Include onClick in the Button component
      style={{ backgroundColor: color, ...style }}
      disabled={disabled}
      type={type}
      {...rest}
      className="fs-6 fw-bold fst-italic"
      data-testid={testId}
    >
      {label}
    </Button>
  );
};

export default ButtonComp;
