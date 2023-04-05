import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FileUpload from "../components/FileUpload";
import { useCreateProductMutation } from "../redux/api/productApi";

const CreateProduct = () => {
  const [createProduct, { data, isSuccess, isLoading }] =
    useCreateProductMutation();

  const [productPicture, setProductPicture] = useState(null);

  const [inputs, setInputs] = useState({
    title: "",
    branch: "",
    price: 0,
    quantity: 0,
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePicture = (e) => {
    const file = e.target.files[0];
    setProductPicture(file);
  };

  const categories = ["zapatillas", "suplementos", "bolsos", "accesorios "];

  const sendFile = () => {
    const formData = new FormData();

    for (const value of Object.entries(inputs)) {
      formData.append(value[0], value[1]);
    }

    if (productPicture) {
      formData.append("picture", productPicture);
    }

    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product created successfully");
    }
  }, [data]);

  return (
    <section className="md:w-[800px] mx-auto py-10 ">
      <h2 className="text-slate text-xl font-semibold mb-6">
        Add a new Product
      </h2>
      <div className="grid ">
        <FileUpload handlePicture={handlePicture} />

        <div className="grid grid-cols-3 gap-4    ">
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <TextField
              className=""
              id="filled-basic"
              label="Title"
              variant="filled"
              name="title"
              onChange={handleChange}
            />
            <TextField
              className=""
              id="filled-basic"
              label="Branch"
              variant="filled"
              name="branch"
              onChange={handleChange}
            />
          </div>

          <TextField
            className="w-full"
            id="filled-basic"
            label="Price"
            variant="filled"
            name="price"
            onChange={handleChange}
          />
          <TextField
            className="w-full"
            id="filled-basic"
            label="Stock"
            variant="filled"
            name="stock"
            onChange={handleChange}
          />
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="filled-basic"
              name="category"
              value={inputs.category}
              onChange={handleChange}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className="col-span-3"
            id="filled-multiline-static"
            label="Add a description"
            multiline
            rows={6}
            variant="filled"
            name="description"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={isLoading}
          onClick={sendFile}
          className="bg-orange text-white font-bold text-xl rounded-md w-[200px] px-2 py-4 mx-auto mt-6 "
        >
          {isLoading ? (
            <CircularProgress
              sx={{ color: "rgba(255,255,255,.8)" }}
              size="1.5rem"
            />
          ) : (
            "Publish Product"
          )}
        </button>
      </div>
    </section>
  );
};
export default CreateProduct;
