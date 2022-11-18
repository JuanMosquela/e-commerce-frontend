import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="container">
      <h2 className="text-slate-900  text-2xl font-bold mb-4">Categories:</h2>
      <div className="grid grid-cols-4 gap-4">
        <Link to="/products">
          <div className="overflow-hidden group relative  w-full rounded-lg cursor-pointer hover:shadow-xl ">
            <img
              className="group-hover:scale-110 ease-in duration-100 "
              src="https://media.istockphoto.com/id/672627592/es/foto/hombre-con-nutrici%C3%B3n-deportiva.jpg?s=612x612&w=0&k=20&c=c194CAo5xsuDlxd36yudxZ0gw4bMOHshQSdmY7mMqvA="
              alt="mano tomando mancuerna"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute bg-black/60 h-[100%] w-[100%] top-0 ease-in duration-100"></div>
            <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in duration-100 ">
              <h3 className="text-white font-bold text-2xl">Proteins</h3>
            </div>
          </div>
        </Link>

        <div className="overflow-hidden group relative  w-full rounded-lg cursor-pointer hover:shadow-xl ">
          <img
            className="group-hover:scale-110 ease-in duration-100 "
            src="https://media.istockphoto.com/id/1132086660/es/foto/vista-lateral-de-la-mujer-musculosa-hermosa-corriendo-en-la-cinta.jpg?s=612x612&w=0&k=20&c=NVS7gyHC9_XNjGHDorwxiQLk11bFUBz6sxMIlS8El1s="
            alt="chica corriendo e cinta"
          />
          <div className="opacity-0 group-hover:opacity-100 absolute bg-black/60 h-[100%] w-[100%] top-0 ease-in duration-100"></div>
          <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in duration-100 ">
            <h3 className="text-white font-bold text-2xl">Machines</h3>
          </div>
        </div>
        <div className="overflow-hidden group relative  w-full rounded-lg cursor-pointer hover:shadow-xl ">
          <img
            className="group-hover:scale-110 ease-in duration-100 "
            src="https://media.istockphoto.com/id/1148822167/es/foto/cerca-de-un-tiro-de-zapatos-de-corredor.jpg?s=612x612&w=0&k=20&c=yO6HrBRtqO2bLR-Hoy8awNgese9oM9geEidqCRBbhzA="
            alt="chica corriendo en la calle"
          />
          <div className="opacity-0 group-hover:opacity-100 absolute bg-black/60 h-[100%] w-[100%] top-0 ease-in duration-100"></div>
          <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in duration-100 ">
            <h3 className="text-white font-bold text-2xl">Shoes</h3>
          </div>
        </div>
        <div className="overflow-hidden group relative  w-full rounded-lg cursor-pointer hover:shadow-xl ">
          <img
            className="group-hover:scale-110 ease-in duration-100 "
            src="https://media.istockphoto.com/id/1213615970/es/foto/fondo-de-gimnasio-equipo-de-peso-de-fitness-en-el-piso-oscuro-vac%C3%ADo.jpg?s=612x612&w=0&k=20&c=iZ76Anesi4U-NalzY2WPbZTIoBomuP8eGimeME_zJls="
            alt="accesorios de gym"
          />
          <div className="opacity-0 group-hover:opacity-100 absolute bg-black/60 h-[100%] w-[100%] top-0 ease-in duration-100"></div>
          <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in duration-100 ">
            <h3 className="text-white font-bold text-2xl">Accesories</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Categories;
