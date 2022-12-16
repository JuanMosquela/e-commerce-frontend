import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import FileUpload from "../components/FileUpload";

const CreateProduct = () => {
  // const [file, setFile] = useState([
  //   {
  //     name: "myfile.jpg",
  //   },
  // ]);

  // console.log(file);

  const categories = ["zapatillas", "suplementos", "bolsos", "accesorios "];

  return (
    <section className="md:container py-10 ">
      <h2 className="text-slate text-xl font-semibold mb-6">
        Add a new Product
      </h2>
      <div className="grid ">
        <FileUpload />

        <div className="grid grid-cols-3 gap-4    ">
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <TextField
              className=""
              id="filled-basic"
              label="Title"
              variant="filled"
            />
            <TextField
              className=""
              id="filled-basic"
              label="Branch"
              variant="filled"
            />
          </div>

          <TextField
            className="w-full"
            id="filled-basic"
            label="Price"
            variant="filled"
          />
          <TextField
            className="w-full"
            id="filled-basic"
            label="Qunatity"
            variant="filled"
          />
          <TextField
            className="w-full"
            id="filled-basic"
            select
            label="Category"
            variant="filled"
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="col-span-3"
            id="filled-multiline-static"
            label="Add a description"
            multiline
            rows={6}
            variant="filled"
          />
        </div>
      </div>
    </section>
  );
};
export default CreateProduct;
