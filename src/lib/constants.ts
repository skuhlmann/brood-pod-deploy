export const TARGET_NETWORK = "0x14a34";

export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0x14a34": "0x2b530b015a096267d71ed54d797238479e817ab5",
  "0x2105": "0x0",
};

export const GRAPH_ENDPOINT: Record<string, string> = {
  // "0x14a34": `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/56yN2ZTTbwcmZSPxDAzo5hgUMwrBfjiJ9c7DHfAwj2Dv`,
  "0x14a34":
    "https://api.studio.thegraph.com/query/3450/proof-of-drink-base-sepolia/version/latest",
  "0x2105": `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/56yN2ZTTbwcmZSPxDAzo5hgUMwrBfjiJ9c7DHfAwj2Dv`,
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
