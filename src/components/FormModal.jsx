import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useUpdateUserMutation } from "../redux/api/productsApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSliceRedux";
import { toast } from "react-toastify";

export default function FormModal({ data }) {
  const [open, setOpen] = useState(false);

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [updateUser, { data: user, error, isLoading }] =
    useUpdateUserMutation();

  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = async () => {
    const newUser = {
      id: data?.user._id,
      name: formInputs.name,
      email: formInputs.email,
    };
    await updateUser(newUser);

    if (!isLoading && !error) {
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(
        setCredentials({
          user: user.user,
          token,
        })
      );
      toast.info("Usuario actualizado");
      setOpen(false);
    }
  }, [user]);

  return (
    <div>
      <Button
        sx={{
          display: "flex",
          gap: ".5rem",
          alingItems: "center",
          marginLeft: "auto",
          color: "#252538",
        }}
        onClick={handleClickOpen}
      >
        <AiOutlineEdit className="text-xl" />
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update your profile picture, username or email adress
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.user.name}
            onChange={handleChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={data?.user.email}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleForm}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
