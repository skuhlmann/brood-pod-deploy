export type POD = {
  tokenId: number;
  description: string;
  name: string;
  external_url: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
    display_type?: string;
  }[];
};

export const ACTIVE_PODS: POD[] = [
  {
    tokenId: 1,
    description:
      "Crisp and dry, traditional pilsner profile with a touch of lemongrass, bergamot and blacktea from late Saphir hop additions.",
    external_url: "https://brood.raidguild.org/redpil",
    image: "https://brood.raidguild.org/assets/drink/redpil/badge.svg",
    name: "Red Pil",
    attributes: [
      {
        trait_type: "Hops",
        value: "Saphir",
      },
      {
        trait_type: "Style",
        value: "Straw Blond Kveik Ale",
      },
      {
        display_type: "number",
        trait_type: "ABV",
        value: "5.1",
      },
      {
        display_type: "number",
        trait_type: "IBU",
        value: "50",
      },
    ],
  },
  {
    tokenId: 2,
    description:
      "A hop forward crushable Kveik Pilsner. Made in collaboration with the Green Pil Podcast. $1 form every sale goes to fund public goods.",
    external_url: "https://brood.raidguild.org/greenpil",
    image: "https://brood.raidguild.org/assets/drink/greenpil/badge.svg",
    name: "Green Pils",
    attributes: [
      {
        trait_type: "Style",
        value: "Italian Style Kveik Pilsner",
      },
      {
        display_type: "number",
        trait_type: "ABV",
        value: "4.5",
      },
      {
        display_type: "number",
        trait_type: "IBU",
        value: "44",
      },
    ],
  },
];
