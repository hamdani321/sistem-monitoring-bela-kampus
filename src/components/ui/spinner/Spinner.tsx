export default function Spinner({ textColor }: { textColor: string }) {
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        {/* <span className="text-gray-600">Loading...</span> */}
        <span className={textColor}>Loading...</span>
      </div>
    </>
  );
}
