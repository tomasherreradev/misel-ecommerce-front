import ImageBanner from './../../assets/images/pescado-banner.png';

export default function Banner() {
  return (
    <div className="relative flex flex-row items-center justify-center rounded-md overflow-hidden p-4 max-w-[1200px] my-12 mx-auto ">
      <div className="absolute inset-0 bg-white bg-opacity-90 rounded-md "></div>
      
      <div className="p-8 relative z-10"> 
        <h2 className="text-black text-3xl font-bold">
          Productos de excelente calidad
        </h2>
        <p className="text-black text-xl font-normal">
          Pescados y Pollos seleccionados
        </p>
        <button className="bg-white text-orange-500 border font-semibold px-4 py-2 rounded-md mt-4 hover:bg-orange-500 hover:text-white transition-all">
          Comprar
        </button>
      </div>

      <img 
        src={ImageBanner} 
        alt="Woman enjoying music with headphones" 
        className="h-[200px] hidden md:block relative z-10"
      />
    </div>
  );
}
