export default function CardDatePortal({
  title,
  tanggal,
}: {
  title: string;
  tanggal: string;
}) {
  return (
    <>
      <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/40">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V7.5a2.25 2.25 0 012.25-2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {title}
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">
              {/* {portal.waktu_mulai} */}
              {tanggal}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Awal periode registrasi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
