import React from "react";
import { InputLabel, Select, MenuItem, Grid } from "@material-ui/core";
const FormSelect = ({ inputLabel, value, setFunc, list }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select value={value} fullWidth onChange={e => setFunc(e.target.value)}>
        {list.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default FormSelect;
