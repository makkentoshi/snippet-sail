import Languages from "./Languages";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";

const Sidebar = () => {
  return (
    <div className="lg:w-[20%] p-5 flex flex-col gap-2 h-screen pt-7 border-r sm:w-[50%]">
      <Logo></Logo>
      <QuickLinks></QuickLinks>
      <Languages></Languages>
    </div>
  );
};

export default Sidebar;