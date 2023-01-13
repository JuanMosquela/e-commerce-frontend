import { useEffect } from "react";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { runConfetti } from "../utils/confetti";

import { AiOutlineCheckCircle } from "react-icons/ai";
import TitleComponent from "../components/TitleComponent";

const Success = () => {
  useEffect(() => {
    runConfetti();
  }, []);

  return (
    <section className="flex justify-center items-center min-height">
      <TitleComponent
        title="Thank you for your purchase"
        text="We´ll email you an order confirmation with details and tracking information"
        icon={<AiOutlineCheckCircle />}
      />
    </section>
  );
};
export default Success;
