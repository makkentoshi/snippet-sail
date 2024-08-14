import React from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";

type LogoProps = {
  collapsed: boolean;
};

const Logo = ({ collapsed }: LogoProps) => {
  return (
    <div className="flex items-center justify-center p-9  transition-all">
      <div className="flex items-center justify-center text-[1.5rem] rounded-[50%] pr-1">
        <div className={`bg-[#31267a] px-[0.3rem] rounded-md mr-1`}>
          <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
        </div>

        {!collapsed && (
          <div className="flex gap-1 text-[19px] pr-5">
            <span className={`font-bold text-[#31267a]`}>Snippet</span>
            <span className="text-slate-600">Sail</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
