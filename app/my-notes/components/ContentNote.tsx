import { useGlobalContext } from "@/ContextApi";

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
  } = useGlobalContext();
  return (
    <div
      className={`border w-1/2 bg-white p-3 rounded-xl ${
        openContentNote ? " block" : "hidden"
      } h-[700px]`}
    >
      ContentNote
      <div onClick={() => setOpenContentNote(false)}>Close</div>
    </div>
  );
};

export default ContentNote;
