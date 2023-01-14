import { Rating } from "@mui/material";
import { useFetchAllReviewsQuery } from "../redux/api/productsApi";
import ReviewModal from "./ReviewModal";

const Reviews = ({ data, auth }) => {
  const { data: dataReviews } = useFetchAllReviewsQuery(data._id);

  return (
    <section className="col-span-4 ">
      <div className="mb-10">
        <h2 className="font-bold text-xl mb-4 ">Customer Reviews</h2>

        <div className="flex justify-between">
          <div className="flex items-center gap-4 ">
            <Rating
              sx={{ fontSize: "2.5rem" }}
              name="size-large"
              size="large"
              value={data.rating}
              precision={0.5}
              readOnly
            />
            <p className="text-dark font-semibold">{`Based on ${data.numReviews} reviews`}</p>
          </div>

          <ReviewModal data={data} auth={auth} />
        </div>
      </div>

      <div className="col-span-4">
        {dataReviews?.productReviews?.length === 0 ? (
          <p>Todavia no hay comentarios</p>
        ) : (
          <>
            <div className="flex flex-col-reverse  gap-2 mb-10  ">
              {dataReviews?.productReviews?.map((review, index) => (
                <div
                  key={index}
                  className="flex border-t border-slate/50 p-2 pt-6"
                >
                  <div className="flex-1 space-y-1 ">
                    <Rating
                      className="read-only"
                      value={review.ratings}
                      precision={0.5}
                      readOnly
                    />
                    <h4 className="text-dark  font-bold text-md">
                      {review.user}
                    </h4>
                    <p className="text-sm">{review.createdAt}</p>
                  </div>
                  <div className="flex-auto">
                    <h4 className="text-dark  font-bold text-md">Excelente</h4>
                    <p className="flex-auto  text-md">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default Reviews;
