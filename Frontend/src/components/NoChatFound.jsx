import { Users } from "lucide-react";


{/*It is by default message */}
function NoChatFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Users className="mb-3 h-12 w-12 text-gray-400" />

      <h2 className="text-lg font-semibold text-white">
        No Contacts Found
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        There are no contacts available yet.
      </p>
    </div>
  );
}

export default NoChatFound;