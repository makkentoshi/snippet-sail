import { UserButton } from "@clerk/nextjs";
import Sidebar from "./components/sidebar/Sidebar";

const page = () => {
  return (
    <div>
      <UserButton></UserButton>
      <Sidebar></Sidebar>
    </div>
  );
};

export default page;
