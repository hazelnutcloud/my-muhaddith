import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute z-10 flex justify-between w-full px-4 py-4 text-white">
      <Link href={"#"}>
        My<span className="text-highlight">Muhaddith</span>
      </Link>
      <div className="space-x-2 text-sm text-primary-white">
        <Link href={"#source"}>Source</Link>
        <Link href={"#about"}>About</Link>
      </div>
    </div>
  );
};

export default Navbar;
