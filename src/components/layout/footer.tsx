import Image from "next/image";
import Link from "next/link";

const links: { title: string; href: string }[] = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "CLAIM",
    href: "/claim/coors",
  },
  {
    title: "PODS",
    href: "/pods/0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF",
  },
  {
    title: "LEADERS",
    href: "/leaderboard/coors",
  },
];

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full p-10">
      <Image src="/logo_footer.svg" alt="logo" width="50" height="50" />
      <div className="flex flex-row justify-center item-center gap-3">
        {links.map((link) => {
          return (
            <Link key={link.title} href={link.href} passHref>
              <div>{link.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
