type Props = {};

function index({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img src="/images/chatting-33.png" alt="chat-logo" className="h-64" />
      <div className="text-6xl font-semibold text-sky-900">ChatWave</div>
      <div className="text-sm text-sky-700 text-center w-2/3 font-bold ">
        Stay connected with the people who matter most in your life. Dive into
        an ocean of seamless communication and ride the waves of meaningful
        conversations!
      </div>
    </div>
  );
}

export default index;
