import { Benefit } from "@/lib/types";
import { base, baseSepolia } from "viem/chains";

export const PROD_MODE =
  (process.env.PROD_MODE && process.env.PROD_MODE.toLowerCase() === "true") ||
  process.env.NEXT_PUBLIC_OVERRIDE_PROD_MODE === "true";

export const POD_CONTRACT_ADDRESS = PROD_MODE
  ? "0xB00B5D137709a301283E225e536E85882Cfadd55"
  : "0x2b530b015a096267d71ed54d797238479e817ab5";
export const CHAIN_ID = PROD_MODE ? base.id : baseSepolia.id;

export const GRAPH_ENDPOINT: Record<number, string> = {
  84532:
    "https://api.studio.thegraph.com/query/3450/proof-of-drink-base-sepolia/version/latest",
  8453: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/AMkym4cycZP1u6Q6XURScG61sGBhh9mYhsXX1po4C5yS`,
};

type TokenConfig = { name: string; tokenId: string; benefits?: Benefit[] };
export const TOKEN_CONFIG: Record<string, TokenConfig> = {
  "1": {
    name: "hotdog",
    tokenId: "1",
    benefits: [
      {
        label: "Free Money",
        external_url: "https://www.raidguild.org/",
        link_title: "View",
      },
    ],
  },
  "2": {
    name: "decent-raidguild",
    tokenId: "2",
    benefits: [
      {
        label: "Voting power in the Battle of the Beers Pitch Contest",
        description:
          "As champions of the frothy realm, POD holders wield the power to cast their votes in the epic Battle of the Beers from September 26 to September 30. Your voice will shape the destiny of these DAOs—rise and be heard!",
        external_url: "https://www.raidguild.org/",
        link_title: "Go Vote",
      },
      {
        label: "Membership in the Post Yer Ale Warpcast Channel",
        description:
          "Only those who bear the sacred mark of the Proof of Drink may ascend to the revered Main feed. Within the Post Yer Ale channel, your tales of valor and ale shall flow freely, forging connections with fellow adventurers.",
        external_url: "https://warpcast.com/~/channel/post-yer-ale",
        link_title: "Post Yer Ale",
      },
      {
        label: "Forgotten Fruit - Wine Discount",
        description:
          "POD holders gain access to the elusive Forgotten Fruit, a digital wine crafted by the legendary Peach Tycoon. Enjoy exclusive discounts on this enchanting elixir, enhancing your tavern gatherings with a touch of magic.",
        external_url: "https://forgottenfruit.xyz/",
        link_title: "View the Elixer",
      },
    ],
  },
  "3": {
    name: "tw",
    tokenId: "3",
    benefits: [
      {
        label: "Free Money",
        external_url: "https://www.raidguild.org/",
        link_title: "View",
      },
    ],
  },
};
export const getTokenIdFromName = (name: string) => {
  const config = Object.keys(TOKEN_CONFIG).find((id) => {
    return TOKEN_CONFIG[id].name === name;
  });
  return config && TOKEN_CONFIG[config].tokenId;
};

export const MEDIA_FILES = {
  illustrations: {
    one: "https://res.cloudinary.com/raidguild/image/upload/v1643179233/BroodGuild/illustrations/illustration_one_tgeifv.svg",
    two: "https://res.cloudinary.com/raidguild/image/upload/v1643179282/BroodGuild/illustrations/illustration_two_kkrfoo.svg",
    three:
      "https://res.cloudinary.com/raidguild/image/upload/v1643179316/BroodGuild/illustrations/char_xbpfo9.png",
    four: "https://res.cloudinary.com/raidguild/image/upload/v1643179272/BroodGuild/illustrations/illustration_four_vypdoj.svg",
  },
  icons: {
    twitter:
      "https://res.cloudinary.com/raidguild/image/upload/v1643179670/BroodGuild/icons/twitter_icon_abdu0n.svg",
    discord:
      "https://res.cloudinary.com/raidguild/image/upload/v1643179670/BroodGuild/icons/discord_icon_d3w2fz.svg",
    drop: "https://res.cloudinary.com/raidguild/image/upload/v1643179670/BroodGuild/icons/drop_icon_lqsnua.svg",
  },
  logos: {
    header:
      "https://res.cloudinary.com/raidguild/image/upload/v1643180026/BroodGuild/logos/logo_header_ft30av.svg",
    footer:
      "https://res.cloudinary.com/raidguild/image/upload/v1643180026/BroodGuild/logos/logo_footer_vgaciq.svg",
  },
};
