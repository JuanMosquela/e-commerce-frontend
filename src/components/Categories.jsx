import { Link } from "react-router-dom";

const categories = [
  {
    name: "suplementos",
    img: "https://media.istockphoto.com/id/672627592/es/foto/hombre-con-nutrici%C3%B3n-deportiva.jpg?s=612x612&w=0&k=20&c=c194CAo5xsuDlxd36yudxZ0gw4bMOHshQSdmY7mMqvA=",
  },
  {
    name: "zapatillas",
    img: "https://media.istockphoto.com/id/1148822167/es/foto/cerca-de-un-tiro-de-zapatos-de-corredor.jpg?s=612x612&w=0&k=20&c=yO6HrBRtqO2bLR-Hoy8awNgese9oM9geEidqCRBbhzA=",
  },
  {
    name: "bolsos",
    img: "https://img.freepik.com/foto-gratis/vista-trasera-hombre-que-lleva-bolsa-asas_53876-95788.jpg?w=1380&t=st=1668979304~exp=1668979904~hmac=55cb64388d2529986c281f39a0766e25fc0f19cfb0a2c5d8d103203e0bf229bf",
  },
  {
    name: "accesorios",
    img: "https://media.istockphoto.com/id/1213615970/es/foto/fondo-de-gimnasio-equipo-de-peso-de-fitness-en-el-piso-oscuro-vac%C3%ADo.jpg?s=612x612&w=0&k=20&c=iZ76Anesi4U-NalzY2WPbZTIoBomuP8eGimeME_zJls=",
  },
];

const Categories = () => {
  return (
    <section className="md:container px-4">
      <h2 className="text-dark text-xl font-bold font-montserrat mb-4 uppercase">
        Categories
      </h2>
      <div className="grid grid-cols-2  md:grid-cols-4  gap-4">
        {categories.map((cat, index) => (
          <Link key={index} to={`/products/${cat.name}`}>
            <div className="overflow-hidden group relative  w-full rounded-lg cursor-pointer hover:shadow-xl ">
              <img
                className="group-hover:scale-110  ease-in duration-100  "
                src={cat.img}
                alt="mano tomando mancuerna"
              />
              <div className="opacity-0 group-hover:opacity-100 absolute bg-dark/50 h-[100%] w-[100%] top-0 ease-in duration-100"></div>
              <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in duration-100 ">
                <h3 className="text-white  text-2xl uppercase font-semibold">
                  {cat.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Categories;
