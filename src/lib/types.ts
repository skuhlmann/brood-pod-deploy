export type PodToken = {
  id: string;
  createdAt: string;
  tokenId: string;
  uri: string;
  totalClaims: string;
  balances?: TokenBalance[];
};
export type TokenMeta = {
  image: string;
  name: string;
  description: string;
  external_url: string;
  recipe_url?: string;
  brewery_url?: string;
  brewery_name?: string;
  attributes: TokenAttribute[];
  partner_urls: PartnerItem[];
};
export type TokenAttribute = {
  trait_type: string;
  value: string;
  display_type?: string;
};
export type PartnerItem = {
  name: string;
  external_url: string;
};
export type Benefit = {
  label: string;
  description?: string;
  external_url: string;
  link_title: string;
};

export type TokenBalance = {
  id: string;
  value: string;
  account: {
    id: string;
    address: string;
  };
  token?: {
    id: string;
  };
};
export type PodAccount = {
  id: string;
  address: string;
  balances: TokenBalance[];
};
export type ClaimRes = {
  id: string;
  code: string;
};
