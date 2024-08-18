import { useState, useEffect } from "react";
import MenuList from "./MenuList";
import AllNotesSection from "./AllNotesSection";
import Sider from "antd/es/layout/Sider";
import Logo from "./Logo";

const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <div className="">
      <Logo collapsed={collapsed} />

      <Sider collapsed={collapsed} collapsible trigger={null}>
        <MenuList setSelectedLanguage={setSelectedLanguage} />
      </Sider>
    </div>
  );
};

export default Sidebar;
