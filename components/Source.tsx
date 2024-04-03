import quran from "@/public/quran.png";

import scholarName from "@/data/scholar";

import Image from "next/image";

const Source = () => {
  return (
    <div className="bg-[#010915] relative flex py-16 lg:py-24">
      <Image
        src={quran}
        alt="Madinah mosque"
        className="absolute object-cover"
        fill
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 255, 255, .1), rgba(0, 0, 0, 0))",
        }}
      ></div>
      <div className="relative flex justify-center w-full h-full text-primary-white">
        <div className="flex flex-col items-center lg:max-w-[1200px] lg:w-full gap-10 px-8">
          <h2 className="underline underline-offset-3">source</h2>
          <div className="space-y-2 text-center">
            <h3 className="text-[#A3B18A] lg:text-2xl">
              Start Your Journey into Islamic Jurisprudence (Fiqh)
            </h3>
            <p className="text-sm lg:text-base">Start searching what you want to know</p>
          </div>
          <div className="grid items-center gap-4 text-sm lg:grid-cols-9">
            {scholarName.map((scholar, i) => (
              <p className="bg-[#FFC02C]/10 border border-[#FFC02C]/30 px-3 py-2 rounded-full text-center" key={i}>
                {scholar.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Source;
