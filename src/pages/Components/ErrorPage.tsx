type Props = {
  message: string;
};

function ErrorPage({ message }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="text-red-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7h2v2h-2v-2zm0-4h2v3h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex items-center justify-center">
          <a
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href="/">
            Go to Home
          </a>
        </div>
      </div>
      <div className="mt-4">
        <a
          className="text-sky-500 hover:text-sky-800"
          href="javascript:history.back()">
          Go Back
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
