import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
