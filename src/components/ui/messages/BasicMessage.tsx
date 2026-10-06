type Parameter = {
  title: string;
  message: string;
};

export default function BasicMessage({ title, message }: Parameter) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <svg
            className="w-8 h-8 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m4-4h8"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>
      </div>
    </>
  );
}
