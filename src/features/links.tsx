import { Button } from "@/components/ui/button";
import { MY_SOCIAL_LINKS } from "@/lib/constant";
import { ObjectKeys } from "@/lib/utils";
import Link from "next/link";

export const Links: React.FC = () => {
  return (
    <>
      {ObjectKeys(MY_SOCIAL_LINKS).map((link) => {
        return (
          <Link target="_blank" key={link} href={MY_SOCIAL_LINKS[link].link}>
            <Button className="bg-transparent" variant={"link"}>{MY_SOCIAL_LINKS[link].Icon}</Button>
          </Link>
        );
      })}
    </>
  );
};
