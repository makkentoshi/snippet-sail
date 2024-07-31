import { UserButton } from "@clerk/nextjs";
import Sidebar from "./components/sidebar/Sidebar";
import ContextArea from "./components/contextArea/ContextArea";

const page = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <ContextArea></ContextArea>
    </div>
  );
};

export default page;
