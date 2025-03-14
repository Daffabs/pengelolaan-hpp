const HeroSatu = () => {
  return (
    <section id="dashboard" className="relative overflow-hidden py-20 md:py-20 p-10 mt-20">
      <div className="container relative">
        <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-2">
          <div className="justify-self-center lg:justify-self-start">
            <div data-aos="flip-left">
              <div className="flex  flex-col rounded-xl border bg-white p-3 shadow-xl sm:w-[24.625rem]">
                <img
                  src="/images/logo_jagwar2.png"
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-semibold !leading-tight xl:text-5xl text-white text-center lg:text-left">
              Sampurasun, <span className="text-about-h1">JAGWAR</span>
            </h1>
            {/* <h1 className="font-semibold !leading-tight text-center lg:text-left">
              <span className="text-2xl xl:text-3xl text-black block">Sampurasun,</span>
              <span className="text-6xl xl:text-7xl text-about-h1 block"> JAGWAR</span>
            </h1> */}
            <p className="text-1xl text-muted-foreground text-justify  max-w-prose leading-relaxed">
              JAGWAR, singkatan dari "Jagjag Waringkas," yang memiliki arti sehat dan kuat. Dalam teknologi, ini menggambarkan sistem atau inovasi yang tangguh, efisien, dan adaptif terhadap perubahan. Teknologi yang "Jagjag Waringkas" harus optimal, tahan terhadap tantangan digital, dan terus berkembang terutama dalam bidang IT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSatu };
