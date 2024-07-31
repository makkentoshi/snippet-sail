import { useGlobalContext } from "@/ContextApi";

const DarkMode = () => {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  const handleClickDarkMode = (index: number) => {
    const updateDarkModeObject = darkMode.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setDarkMode(updateDarkModeObject);
  };

  return (
    <div className="bg-slate-100 h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]">
      {darkMode.map((item, index) => {
        return (
          <div
            className={
              item.isSelected
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-blue-600"
            }
            key={index}
            onClick={() => handleClickDarkMode(index)}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

export default DarkMode;
