const HeroSatu = () => {
  return (
    <section id="dashboard" className="relative overflow-hidden py-20 md:py-20 p-10 md:mt-10">
      <div className="container relative">
        <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-2">
          <div className="justify-self-center lg:justify-self-start">
            <div data-aos="flip-left">
              <div className="flex  flex-col rounded-xl border bg-white p-3 shadow-xl sm:w-[24.625rem]">
                <img
                  src="/images/daffa.png"
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-semibold !leading-tight xl:text-5xl text-white text-center lg:text-left">
              Daffa Bagus <span className="text-about-h1">Syach Putra</span>
            </h1>
            {/* <h1 className="font-semibold !leading-tight text-center lg:text-left">
              <span className="text-2xl xl:text-3xl text-black block">Sampurasun,</span>
              <span className="text-6xl xl:text-7xl text-about-h1 block"> JAGWAR</span>
            </h1> */}
            <p className="text-1xl text-muted-foreground text-justify  max-w-prose leading-relaxed">
              A fresh graduate with expertise in Frontend Development, experienced in designing, developing, and maintaining websites to create an optimal user experience. Skilled in UI/UX Design and Business Analyst, including the ability to analyze business requirements, design systems using ERD and DFD, and understand workflows within ERP systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSatu };
