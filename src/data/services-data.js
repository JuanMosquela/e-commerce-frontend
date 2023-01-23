import { AiOutlineFileText, AiOutlineGift } from "react-icons/ai";
import { BsShieldShaded, BsTruck } from "react-icons/bs";

const servicesInfo = [
  {
    title: "free delivery",
    subt: "On order over $59.99",
    icon: <BsShieldShaded />,
  },
  {
    title: "order prote",
    subt: "Secured information",
    icon: <AiOutlineFileText />,
  },
  {
    title: "promotion gift",
    subt: "special offers",
    icon: <AiOutlineGift />,
  },
  {
    title: "free delivery",
    subt: "From anywhere, any time",
    icon: <BsTruck />,
  },
];

export default servicesInfo;
