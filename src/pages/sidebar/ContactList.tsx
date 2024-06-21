import Contact from "./Contact";

type Props = {
  onItemClick: () => void;
};

function ContactList({ onItemClick }: Props) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Contact onItemClick={onItemClick} />
    </div>
  );
}

export default ContactList;
