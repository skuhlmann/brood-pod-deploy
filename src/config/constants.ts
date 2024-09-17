import { Benefit } from "@/lib/types";
import { base, baseSepolia } from "viem/chains";

export const PROD_MODE =
  process.env.PROD_MODE && process.env.PROD_MODE.toLowerCase() === "true";

export const POD_CONTRACT_ADDRESS =
  "0x2b530b015a096267d71ed54d797238479e817ab5";
export const CHAIN_ID = PROD_MODE ? base.id : baseSepolia.id;

export const GRAPH_ENDPOINT: Record<number, string> = {
  84532:
    "https://api.studio.thegraph.com/query/3450/proof-of-drink-base-sepolia/version/latest",
  8453: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/56yN2ZTTbwcmZSPxDAzo5hgUMwrBfjiJ9c7DHfAwj2Dv`,
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
      },
    ],
  },
  "2": {
    name: "decent-raidguild",
    tokenId: "2",
    benefits: [
      {
        label: "Vote in the Battle of the Beers Pitch Contest",
        description: "POD holders have access to vote from 9/26 to 9/30.",
        external_url: "https://www.raidguild.org/",
      },
      {
        label: "Membership in the Post Yer Ale Warpcast Channel",
        description: "POD holders casts will be promoted to the main feed!",
        external_url: "https://warpcast.com/~/channel/post-yer-ale",
      },
      {
        label: "Forgotten Fruit - Digital Wine Discount",
        description:
          "POD hodlers get a discount on the latest digi-edible from Peach Tycoon",
        external_url: "y",
      },
      {
        label: "Free Money",
        external_url: "https://www.raidguild.org/",
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
