/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
import { fetchPostSearchResults } from '../../services/offer.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogTitle } from '@material-ui/core';

interface FilmOptionType {
  inputValue?: string;
  id?: number;
  name: string;
  display_name?: string;
}

// let tagsOptions: FilmOptionType[] = [];

const filter = createFilterOptions<FilmOptionType>();

export default function FreeSoloCreateOptionDialog({setHashTagHandler,clear}: any) {
  const [value, setValue] = React.useState<FilmOptionType | null | any>(null);
  const [open, toggleOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<any>();
  let [hashTagsList, setHashTagsList] = React.useState<FilmOptionType[]>([]);
  let [openList, setOpenList] = React.useState(false);
  let [isSpinner, setSpinner] = React.useState(false);
  const loading = openList && hashTagsList.length === 0;
  const handleClose = () => {
    
    setDialogValue({
      name: '',
      display_name: ''
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    display_name: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setHashTagHandler(dialogValue.name);
    // setValue({
    //   name: dialogValue.name,
    //   display_name: dialogValue.display_name,
    // });
    handleClose();
  };

  const fetchData = async (query: any, cb: any) => {
    const res = (query && await fetchPostSearchResults(query)) || [];
    cb(res);
  };

  const debouncedFetchData = useCallback(
    debounce((query, cb) => {
      if (query) {
        setOpenList(true);
        setSpinner(true);
      }
      setHashTagsList([]);
      fetchData(query, cb);
    }, 500),
    []
  );

  React.useEffect(() => {
    debouncedFetchData(inputValue, (filteredOptions: any) => {
      console.log('res', filteredOptions);
      setHashTagsList(filteredOptions);
      setSpinner(false);
      // if(filteredOptions.length <= 0) {
      //   setOpenList(false);
      // }
    });
  }, [inputValue, debouncedFetchData]);
  return (
    <React.Fragment>
      <Autocomplete
        fullWidth
        open={openList}
        onClose={() => {
          setOpenList(false);
        }}
        loading={loading}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              // toggleOpen(true);
              // setDialogValue({
              //   name: newValue,
              //   display_name: ''
              // });
            });
          } else if (newValue && newValue.inputValue) {
            // toggleOpen(true);
            setHashTagHandler(newValue.inputValue);
            // setDialogValue({
            //   name: newValue.inputValue,
            //   display_name: ''
            // });
          } else {
            //setValue(null);
            // setValue(newValue);
            setHashTagHandler(newValue?.name);
            setValue(null);
            
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params) as FilmOptionType[];
          console.log('params', params);
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              display_name: `Add "${params.inputValue}"`,
              name: `${params.inputValue}`
            });
          }
          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={hashTagsList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option?.name;
        }}
        selectOnFocus
        clearOnBlur
        blurOnSelect={true}
        handleHomeEndKeys
        renderOption={(option) => option.display_name}
        style={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} variant="outlined"
            placeholder='Search eg. $AAPL'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isSpinner ? <CircularProgress color="inherit" size={20} /> : null}
                  {/* <Button variant="contained" color="primary" className="add-tag">
                    Add
                  </Button> */}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-name">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a tag</DialogTitle>
          {/* <Dialogname id="form-dialog-name">Add a new film</Dialogname> */}
          <DialogContent>
            <DialogContentText>
              Did you miss any tag in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
              label="name"
              type="text"
              fullWidth
            />
            {/* <TextField
              margin="dense"
              id="name"
              value={dialogValue.display_name}
              onChange={(event) => setDialogValue({ ...dialogValue, display_name: event.target.value })}
              label="Display name"
              type="text"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>


    </React.Fragment>
  );
}