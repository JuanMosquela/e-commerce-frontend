import { CircularProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useFetchAllReviewsQuery,
} from "../redux/api/productsApi";
import RatingComponent from "./RatingComponent";

const Reviews = ({ data, auth }) => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const { data: dataReviews } = useFetchAllReviewsQuery(data._id);

  const [createReview, { data: reviewData, isLoading, error }] =
    useCreateReviewMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (!isLoading) e.target.reset();
  };

  useEffect(() => {
    if (reviewData && !isLoading) {
      toast.success("Product reviewed");
    }

    if (error?.status === 501) {
      toast.error(`${error?.data?.msg}`);
    }
  }, [error, reviewData]);

  return (
    <div className="col-span-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <h3 className="text-md text-slate font-semibold mb-4">Reviews</h3>
          {dataReviews?.productReviews?.length === 0 ? (
            <p>Todavia no hay comentarios</p>
          ) : (
            <div className="flex flex-col-reverse  gap-2  ">
              {dataReviews?.productReviews?.map((review, index) => (
                <div key={index} className="bg-slate/10 rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <h4>{review.user}</h4>
                    <Rating
                      className="read-only"
                      value={review.ratings}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="text-md">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-2">
          <form action="" onSubmit={handleSubmit}>
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
                className="bg-orange flex justify-center items-center  px-6 gap-3 text-white font-semibold text-md w-[100px]  py-2 mt-6 rounded-md"
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
        </div>
      </div>
    </div>
  );
};
export default Reviews;
