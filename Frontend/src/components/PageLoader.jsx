import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#1e222a]">
      <LoaderIcon className="h-10 w-10 animate-spin" />
    </div>
  );
}

export default PageLoader;