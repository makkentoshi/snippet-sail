import React from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-blue-600 p-[6px] rounded-[10px]">
        <DataObjectIcon sx={{ fontSize: 27, color: "white" }}></DataObjectIcon>
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className="font-bold text-blue-600">Snippet</span>
        <span className="text-slate-600">Master</span>
      </div>
    </div>
  );
};

export default Logo;
