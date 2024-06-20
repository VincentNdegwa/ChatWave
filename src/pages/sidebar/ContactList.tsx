import Contact from "./Contact";

type Props = {};

function ContactList({}: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <Contact />
      <Contact />
    </div>
  );
}

export default ContactList;
