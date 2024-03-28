// This is for hadith of the day

import CardHotd from "./CardHotd";
import hadithData, { hadith } from "@/data/hotd";

const Hotd = () => {
  return (
    <div className="bg-gradient-to-b from-[#121B34] to-[#010915] py-16 lg:py-20 pl-8 lg:flex lg:justify-center lg:items-center  text-primary-white space-y-6 ">
      <div className="space-y-8 lg:max-w-[1200px] lg:w-full">
        <h2 className="text-xl">Hadith of the day</h2>
        <div className="flex w-full gap-6 pr-8 overflow-scroll mask-gradient-hotd snap-x scrollbar-hide">
          {hadithData.map((hadith: hadith, i: number) => (
            <CardHotd hadith={hadith} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotd;
