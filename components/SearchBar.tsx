import Image from "next/image";
import book from "@/public/icons/read-book-icon.svg";

const SearchBar = () => {
  return (
    <div className="relative flex justify-between p-1 px-5 text-sm rounded-full bg-primary-white lg:w-1/2 md:w-3/4">
      <input
        type="text"
        placeholder="Hukum tidak..."
        className="w-full text-sm bg-primary-white focus:outline-none"
      ></input>
      <div className="bg-primary-white">
        <Image src={book} alt="book button" className="w-10 p-2" />
      </div>
    </div>
  );
};

export default SearchBar;
