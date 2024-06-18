type Props = {};

export default function colorbox({}: Props) {
  return (
    <div className="flex flex-wrap justify-center p-8">
      <h1 className="text-font">Heading</h1>
      <div className="w-1/3 p-4">
        <div className="bg-sky-950  p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Sky Blue Light</h2>
        </div>
        <div className="bg-sky-700 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Sky Blue</h2>
        </div>
        <div className="bg-sky-400  p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Sky Blue Dark</h2>
        </div>
      </div>
    </div>
  );
}
