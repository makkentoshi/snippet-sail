import {
  SiJavascript,
  SiPython,
  SiCplusplus,
} from "@icons-pack/react-simple-icons";

const Languages = () => {
  return (
    <div className="mt-12 text-sm">
      <div className="font-bold text-slate-400">Languages</div>
      <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiJavascript size={15}></SiJavascript> Javascript
          </div>
          <span className="font-bold">3</span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiPython size={15}></SiPython> Python
          </div>
          <span className="font-bold">10</span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiCplusplus size={15}></SiCplusplus> C++
          </div>
          <span className="font-bold">2</span>
        </div>
      </div>
    </div>
  );
};

export default Languages;
