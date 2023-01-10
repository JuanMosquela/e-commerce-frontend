import { useEffect } from "react";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { runConfetti } from "../utils/confetti";
import TitlteComponent from "../components/TitlteComponent";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Success = () => {
  useEffect(() => {
    runConfetti();
  }, []);

  return (
    <section className="flex justify-center items-center min-height">
      <TitlteComponent
        title="Thank your for your buy"
        text="We´ll email you an order confirmation with details and tracking information"
        icon={<AiOutlineCheckCircle />}
      />
    </section>
  );
};
export default Success;
