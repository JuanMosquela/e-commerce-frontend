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
import FileUpload from "./FileUpload";
import { CircularProgress } from "@mui/material";

export default function FormModal({ data }) {
  const [open, setOpen] = useState(false);

  const [formInputs, setFormInputs] = useState({
    name: data?.user?.name,
    email: data?.user?.email,
  });

  const [picture, setPicture] = useState(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [updateUser, { data: user, error, isLoading }] =
    useUpdateUserMutation();

  console.log(user, error);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = () => {
    const formData = new FormData();

    for (const value of Object.entries(formInputs)) {
      formData.append(value[0], value[1]);
    }

    if (picture) {
      formData.append("picture", picture);
    }

    const newUser = {
      id: data?.user._id,
      body: formData,
    };

    updateUser(newUser);
  };

  useEffect(() => {
    if (user) {
      dispatch(
        setCredentials({
          user: user.user,
          email: user.user.email,
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
          <FileUpload handlePicture={handlePicture} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={formInputs.name}
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
            value={formInputs.email}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "#f8b435",
              color: "#FFF",
              "&:hover": { backgroundColor: "#f8b435", color: "#FFF" },
            }}
            disabled={isLoading}
            onClick={handleForm}
          >
            {isLoading ? (
              <CircularProgress
                sx={{ color: "rgba(255,255,255,.8)" }}
                size="1.5rem"
              />
            ) : (
              "Update"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
