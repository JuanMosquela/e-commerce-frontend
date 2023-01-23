import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../redux/api/productsApi";
import RatingComponent from "./RatingComponent";

const ReviewModal = ({ data, auth }) => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const [createReview, { data: reviewData, isLoading, error }] =
    useCreateReviewMutation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFF",
    borderRadius: "12px",
    p: 4,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!auth.token) {
        toast.error("Debes estar autenticado");
        navigate("/login");
        return;
      }
      createReview({
        id: data._id,
        user: auth?.user.name,
        comment,
        value,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("se cierra");
  };

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
    }

    if (reviewData && !isLoading) {
      toast.success("Product reviewed");
    }

    if (error?.status === 501) {
      toast.error(`${error?.data?.msg}`);
    }
  }, [error, reviewData]);

  return (
    <div className="">
      {auth.user._id === data.boughtBy && (
        <button
          onClick={handleOpen}
          className=" bg-dark text-white rounded-sm  px-4 py-2 font-bold text-sm uppercase"
        >
          write a review
        </button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="w-[85%]  md:w-[700px]">
          <form onSubmit={handleSubmit}>
            <h3 className="text-md text-slate font-semibold">
              Deja un comentario
            </h3>
            <textarea
              className="bg-slate/10 p-2 text-md w-full outline-none mt-4 resize-none rounded-md"
              name="textarea"
              rows="7"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deja un comentario"
            ></textarea>
            <div className="flex items-center justify-between">
              <RatingComponent
                value={value}
                setValue={setValue}
                hover={hover}
                setHover={setHover}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-orange flex justify-center items-center w-[100px] h-[40px] mt-4 gap-3 text-white font-semibold text-md  rounded-md"
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size="1.5rem"
                      sx={{ color: "rgba(255,255,255)" }}
                    />
                  </>
                ) : (
                  "Enviar"
                )}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ReviewModal;
