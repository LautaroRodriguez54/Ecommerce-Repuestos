import Link from "next/link";

export const InfoBlock = ({ title, texts = [], links = [] }) => {
  return (
    <div>
      <h1>{title}</h1>

      {texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}

      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.text}
        </Link>
      ))}
    </div>
  );
};

