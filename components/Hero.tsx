import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold text-2xl text-center">
        Organize Your Code Snippets
        <span className="text-[#31267a]"> Efficiently!</span>
      </h2>
      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it. Spend less time searching for
        code and more time writing it.
      </p>
      <Button className="block px-9 py-2 text-sm font-medium text-black transition-all focus:outline-none border rounded-xl hover:bg-slate-50 ">
        {"Let's get started!"}
      </Button>
    </div>
  );
};

export default Hero;
