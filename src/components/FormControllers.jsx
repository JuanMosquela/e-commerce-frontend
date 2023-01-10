const FormControllers = (props) => {
  console.log(props);
  return (
    <div className=" col-span-2 flex justify-between items-center bg-gray   ">
      <div>
        {props.hasPrevious && (
          <button
            className="bg-dark text-white rounded-md w-[100px] h-[40px]"
            onClick={props.onBackClick}
            type="button"
          >
            Back
          </button>
        )}
      </div>
      <div>
        <button
          className="bg-orange text-white rounded-md w-[100px] h-[40px]"
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
