import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import suscribe from "../img/suscribe-background.jpg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Suscribe = () => {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.trim() || !checked) {
      return console.log("completa los campos");
    }

    console.log(email, checked);
  };

  return (
    <section className="  min-h-[40vh] overflow-hidden relative  flex justify-center items-center mb-8 ">
      <img
        className=" absolute w-full h-[100%] object-cover "
        src={suscribe}
        alt="hombre haciendo curl de biceps con barra"
      />
      <div className=" md:container flex flex-col justify-center items-center z-20   ">
        <div>
          <div>
            <h3 className="  text-4xl text-white  font-bold mb-4">
              Let's keep in touch
            </h3>
            <p className="font-semibold text-white mb-4">
              Suscribe to keep up with news and exciting updated
            </p>
          </div>
          <form className="w-[600px]" onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <input
                name="email"
                className="flex-1 bg-gray rounded-sm px-2 py-3"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 text-white font-bold text-lg bg-orange hover:bg-hover_orange rounded-sm hover:shadow-md  py-1 min-w-[180px] duration-300"
              >
                Send
                <AiOutlineMail className="text-white text-2xl" />
              </button>
            </div>
            <div className="flex gap-4 max-w-sm">
              <input
                type="checkbox"
                name="checkbox"
                value={checked}
                id=""
                className=" scale-150 "
                onChange={() => setChecked((prev) => !prev)}
              />
              <p className="text-white   text-sm ">
                I agree to my email adress being stored and used to recive
                monthly newsletter
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Suscribe;
