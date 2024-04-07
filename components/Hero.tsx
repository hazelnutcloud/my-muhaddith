import Image from "next/image";

// icons
import books from "@/public/icons/read-book-icon.svg";

// images
import bg_hero from "@/public/bg-hero.jpg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div id="#" className="relative h-[400px] lg:h-[700px]">
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
      <div className="relative flex justify-center w-full h-full gap-10">
        <div className="flex flex-col items-center justify-center lg:max-w-[1200px] lg:w-full space-y-6 lg:space-y-12">
          <div className="relative text-primary-white text-center max-w-[90%]">
            <div className="lg:space-y-2">
              <h1 className="text-xl lg:text-6xl md:text-4xl">
                Discover the Wisdom of Ages{" "}
              </h1>
              <h1 className="text-xl lg:text-3xl lg:leading-[75px] md:text-4xl md:leading-[50px]">
                Your Gateway to Precise Hadith Search
              </h1>
            </div>

            <p className="text-[12px] pt-2 lg:text-lg md:text-base">
              Embark on a Journey Through Time: Uncover the Treasures of Hadith
              Wisdom
            </p>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
