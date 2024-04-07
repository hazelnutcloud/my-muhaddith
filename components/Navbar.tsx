import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute z-10 flex items-center justify-center w-full px-4 py-4 text-white md:px-10">
      <div className="flex justify-between lg:max-w-[1200px] w-full">
        <Link href={"/"}>
          My<span className="text-highlight">Muhaddith</span>
        </Link>
        <div className="space-x-2 text-sm lg:space-x-6 md:space-x-6 lg:text-base text-primary-white">
          <Link href={"#source"}>Source</Link>
          <Link href={"#about"}>About</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
