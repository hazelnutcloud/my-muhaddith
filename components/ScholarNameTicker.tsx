import scholarName from "@/data/scholar";

const ScholarNameTicker: React.FC = () => {
  return (
    <div className="inline-flex w-full gap-10 py-4 overflow-hidden flex-nowrap bg-primary-blue">
      <div className="w-full mask-gradient">
        <div className="flex gap-8 text-primary-white/70 whitespace-nowrap infinite-scroll">
          {scholarName.map((scholar, index) => (
            <p key={index}>{scholar.name}</p>
          ))}
          {scholarName.map((scholar, index) => (
            <p key={index}>{scholar.name}</p>
          ))}
          {scholarName.map((scholar, index) => (
            <p key={index}>{scholar.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ScholarNameTicker;
