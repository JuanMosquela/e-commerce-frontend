import { CircularProgress } from "@mui/material";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const FormControllers = (props) => {
  return (
    <div className=" col-span-2 flex justify-between items-center  ">
      <div>
        {props.hasPrevious && (
          <button
            className="bg-gray text-dark font-black rounded-md  w-[100px] py-3  flex justify-center items-center gap-2"
            onClick={props.onBackClick}
            type="button"
          >
            Back
          </button>
        )}
      </div>
      <div>
        <button
          className="bg-dark text-white rounded-md  font-black  w-[100px] py-3 flex justify-center items-center gap-2"
          disabled={props.isSubmitting}
          type="submit"
        >
          {props.isLastStep ? (
            <div>
              {props.isLoading ? (
                <CircularProgress
                  sx={{ color: "rgba(255,255,255,.8)" }}
                  size="1.5rem"
                />
              ) : (
                "Purchase"
              )}
            </div>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};
export default FormControllers;
