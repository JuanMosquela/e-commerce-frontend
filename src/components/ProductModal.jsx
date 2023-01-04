import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

import FileUpload from "./FileUpload";
import { useUpdateProductMutation } from "../redux/api/productsApi";
import { CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductModal({ data }) {
  const [open, setOpen] = useState(false);

  const [productPicture, setProductPicture] = useState(null);

  const [updateProduct, { data: productData, error, isLoading }] =
    useUpdateProductMutation();

  const [formInputs, setFormInputs] = useState({
    title: data?.title,
    branch: data?.branch,
    category: data?.category,
    price: data?.price,
    stock: data?.stock,
    description: data?.description,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "#FFF",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePicture = (e) => {
    const file = e.target.files[0];
    setProductPicture(file);
  };

  const handleForm = () => {
    const formData = new FormData();

    if (productPicture) {
      formData.append("picture", productPicture);
    }
    for (const value of Object.entries(formInputs)) {
      formData.append(value[0], value[1]);
      console.log(value[0] + ", " + value[1]);
    }
    const newProduct = {
      id: data?._id,
      body: formData,
    };

    updateProduct(newProduct);
  };

  useEffect(() => {
    if (productData) {
      toast.info("Product updated");
      setOpen(false);
    }
  }, [productData]);

  return (
    <div>
      <FiEdit onClick={handleOpen} className=" text-white text-xl  " />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent className="grid grid-cols-2 gap-6">
            <div>
              <DialogContentText>
                Update your product information
              </DialogContentText>
              <FileUpload handlePicture={handlePicture} />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={data?.title}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Branch"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={data?.branch}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="category"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={data?.category}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="name"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={data?.price}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="stock"
                name="name"
                label="Stock"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={data?.stock}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={data?.description}
                onChange={handleChange}
                required
              />
            </div>
            <figure className="w-[450px] h-[500px] mx-auto">
              <img
                className="h-[100%] object-cover "
                src={data?.pictureURL}
                alt=""
              />
            </figure>
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
        </Box>
      </Modal>
    </div>
  );
}
