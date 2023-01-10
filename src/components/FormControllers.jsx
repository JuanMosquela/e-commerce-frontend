import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const FormControllers = (props) => {
  return (
    <div className=" col-span-2 flex justify-between items-center  ">
      <div>
        {props.hasPrevious && (
          <button
            className="bg-slate/30 text-dark font-black rounded-sm  w-[85px] h-[45px] flex justify-center items-center gap-2"
            onClick={props.onBackClick}
            type="button"
          >
            Back
          </button>
        )}
      </div>
      <div>
        <button
          className="bg-orange text-white  font-black rounded-sm  w-[85px] h-[45px] flex justify-center items-center gap-2"
          disabled={props.isSubmitting}
          type="submit"
        >
          {props.isLastStep ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};
export default FormControllers;
