import ClipLoader from "react-spinners/ClipLoader";
function SuspenseLoader() {
  return (
    <div className="sweet-loading h-full w-full flex justify-center items-center">
     <ClipLoader
        color={"#2F3E83"}
        loading={true}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SuspenseLoader;