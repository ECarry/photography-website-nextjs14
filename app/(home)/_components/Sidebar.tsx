import Link from "next/link";
import LinksItem from "./links-item";
import { routes } from "./routes";

const Navbar = () => {
  return (
    <div className="p-[50px] fixed md:flex flex-col gap-8 hidden">
      <Link href={"/"} className="text-2xl font-semibold">
        Photo Blog
      </Link>

      <nav className="flex flex-col text-[#1F1F1F] gap-8">
        <ul className="space-y-1">
          {routes.map((route) => (
            <LinksItem
              key={route.label}
              label={route.label}
              href={route.href}
            />
          ))}
        </ul>
        <ul className="text-[13px] space-y-[2px]">
          <li>
            <Link href={""}>Blog</Link>
          </li>
          <li>
            <Link href={""}>Contact</Link>
          </li>
          <li>
            <Link href={""}>Read Me</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
