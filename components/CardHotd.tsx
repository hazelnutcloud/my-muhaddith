import React from "react";

interface hadith {
  hadith: string;
  scholar: string;
}

const CardHotd = ({ hadith }: { hadith: hadith }) => {
  return (
    <div className="bg-[#3E484E]/30 p-8 min-w-[280px] lg:max-w-[400px] lg:min-h-[350px] lg:rounded-2xl rounded-md space-y-4 flex flex-col snap-center">
      <p className="flex-1 text-sm tracking-wider">{hadith.hadith}</p>
      <p className="text-sm text-right text-highlight">[{hadith.scholar}]</p>
    </div>
  );
};

export default CardHotd;
