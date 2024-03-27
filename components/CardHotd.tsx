import React from "react";

interface hadith {
  hadith: string;
  scholar: string;
}

const CardHotd = ({ hadith }: { hadith: hadith }) => {
  return (
    <div className="bg-[#3E484E]/30 p-8 min-w-[280px] rounded-md space-y-4 flex flex-col snap-center">
      <p className="flex-1 text-sm">{hadith.hadith}</p>
      <p className="text-sm text-right text-highlight">[{hadith.scholar}]</p>
    </div>
  );
};

export default CardHotd;
