import servicesInfo from "../utils/servicesData";

const Services = () => {
  return (
    <div className=" container flex justify-between items-center min-h-[20vh] gap-6">
      {servicesInfo.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-center gap-6 border-orange border-2 p-2 flex-1"
        >
          <i className="text-2xl">{service.icon}</i>

          <div>
            <h4 className="text-slate-700 text-md font-bold uppercase">
              {service.title}
            </h4>
            <p className="text-sm text-gray-500 ">{service.subt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Services;
