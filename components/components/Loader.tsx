import { Loader } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <Loader size={24} className="animate-spin" />
    </div>
  );
};

export default Loader;
