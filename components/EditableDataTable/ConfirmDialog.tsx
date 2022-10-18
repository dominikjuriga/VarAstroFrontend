import React from 'react'
import Button from "@mui/material/Button"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface IConfirmDialog {
  promiseArguments: any;
  itemCount: number;
  noButtonRef: any;
  handleEntered: () => void;
  handleNo: () => void;
  handleYes: () => void;
}

const ConfirmDialog = ({ promiseArguments, itemCount,
  noButtonRef, handleEntered,
  handleNo, handleYes }: IConfirmDialog) => {
  if (!promiseArguments) {
    return null;
  }

  return (
    <Dialog
      maxWidth="xs"
      TransitionProps={{ onEntered: handleEntered }}
      open={!!promiseArguments}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent dividers>
        {`Pressing 'Yes' will remove ${itemCount} selected item(s).`}
      </DialogContent>
      <DialogActions>
        <Button ref={noButtonRef} onClick={handleNo}>
          No
        </Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog