type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="/images/Logo.jpg"
          alt="Logo"
          className="mx-auto mb-8 h-[200px] w-[200px]"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">
          Loading...
        </h2>
        <div className="flex justify-center">
          <svg
            className="animate-spin h-10 w-10 text-sky-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
