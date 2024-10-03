import { FaRocket } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BiHappyBeaming } from "react-icons/bi";

const services = [
  {
    icon: <FaRocket className="text-4xl text-orange-500" />,
    description: "Delivery Rápido",
  },
  {
    icon: <IoShieldCheckmarkSharp className="text-4xl text-orange-500" />,
    description: "Pagos Seguros",
  },
  {
    icon: <BiHappyBeaming className="text-4xl text-orange-500" />,
    description: "Atención Amigable",
  },
];

export default function ServicesComponent() {
  return (
    <div className="bg-white relative w-full p-12">
      <div className="bg-white -mt-20 max-w-[600px] w-full mx-auto p-5">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {services.map((service, index) => (
            <div key={index} className="text-gray-600 flex flex-col justify-center items-center gap-2">
              <div>{service.icon}</div>
              <p className="max-w-[155px] font-semibold">{service.description}</p>
              </div>
          ))}
          </div>
        </div>
    </div>
  );
}
