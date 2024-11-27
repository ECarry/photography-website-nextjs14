import AnimatedLink from "@/components/animated-link";

interface Props {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

const FooterNav = ({ title, links }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <h1>{title}</h1>
      <ul className="flex flex-col gap-5 text-sm opacity-60">
        {links.map((link) => (
          <li key={link.href}>
            <AnimatedLink
              link={link.href}
              label={link.title}
              className="text-text-default dark:text-text-inverse"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNav;
