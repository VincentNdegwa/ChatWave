import { useEffect, useRef } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function ChatConversation() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <div className="flex flex-col justify-end w-full h-full">
      <div className="flex flex-col w-full h-full gap-y-3 overflow-y-scroll scrollbar-custom ">
        {/* 1 */}
        <div className="left w-3/6 self-start">
          <div className="flex gap-x-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="profile-pic"
              className="rounded-full h-10 w-10 gap-x-3 self-end"
            />
            <div className="text-sm">
              <div className="p-2 bg-sky-700 text-white rounded-t-lg rounded-br-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias eius nihil iusto consequatur aspernatur doloribus
                porro corrupti exercitationem consectetur cupiditate deserunt in
                aliquam, incidunt harum aut. Perferendis, accusamus tempora?
                Quasi! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Animi, iste! Enim nostrum magni quae necessitatibus? Aliquid,
                maxime tempore. Quae harum assumenda ipsa dolorum recusandae
                reprehenderit molestias aliquid libero qui incidunt!
              </div>
              <div className="text-xs mt-2">5:12 PM</div>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="right w-3/6 p-2 self-end">
          <div className="text-sm flex flex-col">
            <div className="p-2 bg-sky-100 text-sky-950 rounded-t-lg rounded-bl-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              eius nihil iusto consequatur aspernatur doloribus porro corrupti
              exercitationem consectetur cupiditate deserunt in aliquam,
              incidunt harum aut. Perferendis, accusamus tempora? Quasi! Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Animi, iste!
              Enim nostrum magni quae necessitatibus? Aliquid, maxime tempore.
              Quae harum assumenda ipsa dolorum recusandae reprehenderit
              molestias aliquid libero qui incidunt!
            </div>
            <div className="mt-2 self-end flex gap-x-1">
              <div className="text-xs">5:12 PM</div>
              <IoCheckmarkDoneOutline />
            </div>
          </div>
        </div>
        <div className="right w-3/6 p-2 self-end">
          <div className="text-sm flex flex-col">
            <div className="p-2 bg-sky-100 text-sky-950 rounded-t-lg rounded-bl-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              eius nihil iusto consequatur aspernatur doloribus porro corrupti
              exercitationem consectetur cupiditate deserunt in aliquam,
              incidunt harum aut. Perferendis, accusamus tempora? Quasi! Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Animi, iste!
              Enim nostrum magni quae necessitatibus? Aliquid, maxime tempore.
              Quae harum assumenda ipsa dolorum recusandae reprehenderit
              molestias aliquid libero qui incidunt!
            </div>
            <div className="mt-2 self-end flex gap-x-1">
              <div className="text-xs">5:12 PM</div>
              <IoCheckmarkDoneOutline />
            </div>
          </div>
        </div>
        <div className="right w-3/6 p-2 self-end">
          <div className="text-sm flex flex-col">
            <div className="p-2 bg-sky-100 text-sky-950 rounded-t-lg rounded-bl-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              eius nihil iusto consequatur aspernatur doloribus porro corrupti
              exercitationem consectetur cupiditate deserunt in aliquam,
              incidunt harum aut. Perferendis, accusamus tempora? Quasi! Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Animi, iste!
              Enim nostrum magni quae necessitatibus? Aliquid, maxime tempore.
              Quae harum assumenda ipsa dolorum recusandae reprehenderit
              molestias aliquid libero qui incidunt!
            </div>
            <div className="mt-2 self-end flex gap-x-1">
              <div className="text-xs">5:12 PM</div>
              <IoCheckmarkDoneOutline />
            </div>
          </div>
        </div>
        <div className="right w-3/6 p-2 self-end">
          <div className="text-sm flex flex-col">
            <div className="p-2 bg-sky-100 text-sky-950 rounded-t-lg rounded-bl-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              eius nihil iusto consequatur aspernatur doloribus porro corrupti
              exercitationem consectetur cupiditate deserunt in aliquam,
              incidunt harum aut. Perferendis, accusamus tempora? Quasi! Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Animi, iste!
              Enim nostrum magni quae necessitatibus? Aliquid, maxime tempore.
              Quae harum assumenda ipsa dolorum recusandae reprehenderit
              molestias aliquid libero qui incidunt!
            </div>
            <div className="mt-2 self-end flex gap-x-1">
              <div className="text-xs">5:12 PM</div>
              <IoCheckmarkDoneOutline />
            </div>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatConversation;
