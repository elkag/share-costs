import React from 'react';
import { Button, DialogTitle, DialogContent, DialogActions, TextField, Dialog, DialogContentText, TextareaAutosize } from '@material-ui/core';

const WriteExpenseNameDialog = ({onSubmit, onCancel}) => {
    
    const [open, setOpen] = React.useState(true);
    const [description, setDescription] = React.useState('');
    
      const handleCancel = () => {
        onCancel(description);
        setOpen(false);
      };
        
      const handleSubmit = () => {
        onSubmit(description);
        setOpen(false);
      };

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
      };

    return (
        <div>
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Description</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Write a name or description for this payment
              </DialogContentText>
              <TextField
                autoFocus
                onChange={onChangeDescription}
                margin="dense"
                id="description"
                label="Expense description"
                type="multiline"
                inputProps={{ maxLength: 30 }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={description===''} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default WriteExpenseNameDialog;