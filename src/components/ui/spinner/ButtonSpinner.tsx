export default function ButtonSpinner({
  text = "Loading...",
}: {
  text: string;
}) {
  return (
    <>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <span>{text}</span>
    </>
  );
}
