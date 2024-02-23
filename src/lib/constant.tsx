import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export const INITIAL_GEN_COUNT = 1;

export const MAX_GEN_COUNT = 6;

export const MY_SOCIAL_LINKS = {
  github: {
    Icon: <GitHubLogoIcon className="text-white" height={20} width={20}/>,
    link: "https://github.com/Badhan-abhishek/rnam",
  },
  x: {
    Icon: <Image src={"/x-logo.svg"} height={20} width={20} alt="X logo" />,
    link: "https://twitter.com/beizti",
  },
};
