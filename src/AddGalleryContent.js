import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

function AddGalleryContent(list) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({
        description: '',
        thumbnailname: '',
        extension: '',
        filename: '',
        expiryDate: ''
    });


       function callApi(e) {

        let formData = new FormData();
        formData.append('file',e.target.files[0]);
        const URL = 'http://localhost:8081/api/v1/files';
        fetch(URL,{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: formData
        }).then((response) =>response.json())
        .then((result) => {
        
            setFile(...file, result.data)
          console.log('Success:', result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
       
        setFile({ ...file, [e.target.name]: e.target.value })
    }

    async function handleFile (e) {
        callApi(e);
    }

    const addFile = () => {
        list.addItem(file);
        handleClose();
    }


    return (
        <div>
            <Button style={{ marginTop: 10 }} variant="outlined" color="primary" onClick={handleOpen}>Add Item</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Item</DialogTitle>
                <DialogContent>
                <input onChange={handleFile}
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
                    <TextField autoFocus margin="dense" value={file.description} onChange={handleChange} name="description" label="Description" fullWidth />
                    <TextField autoFocus margin="dense" value={file.expiryDate} onChange={handleChange} name="expiryDate" label="ExpiryDate" fullWidth />
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={addFile} color="primary">
                        Add
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddGalleryContent;