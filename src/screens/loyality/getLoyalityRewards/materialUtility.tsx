import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
  {
    value: 'Monthly',
    label: 'Monthly',
  },
  {
    value: 'Annually',
    label: 'Annually',
  }
];


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export default function MultilineTextFields({ values, on_Change }: any) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("form handle change", event.target.value)
    on_Change({
      ...values,
      ["renewal"]: event.target.value
    })
  };
  console.log(values)
  return (
    <TextField
      id="outlined-select-currency"
      select
      label={values ? values : "Renewal"}
      name="renewal"
      value={values}
      onChange={on_Change}
      variant="outlined"
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>

  );
}
