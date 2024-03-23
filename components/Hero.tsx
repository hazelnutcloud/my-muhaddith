import Image from "next/image";

// icons
import books from "@/public/icons/read-book-icon.svg";

// images
import bg_hero from "@/public/bg-hero.jpg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div id="#" className="relative h-[400px]">
      <Image
        src={bg_hero}
        alt="Madinah mosque"
        className="absolute object-cover"
        fill
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to top, rgba(18, 27, 52, 1), rgba(0, 0, 0, 0))",
        }}
      ></div>
      <div className="relative flex flex-col items-center justify-center w-full h-full gap-10">
        <div className="relative text-primary-white text-center max-w-[90%]">
          <h1 className="text-xl">Discover the Wisdom of Ages </h1>
          <h1 className="text-xl">Your Gateway to Precise Hadith Search</h1>
          <p className="text-[12px] pt-2">
            Embark on a Journey Through Time: Uncover the Treasures of Hadith
            Wisdom
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
