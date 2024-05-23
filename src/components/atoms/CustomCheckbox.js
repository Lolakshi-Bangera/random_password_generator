import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckbox = ({ checked = true, onChange, label }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default CustomCheckbox;
