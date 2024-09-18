import { TokenMeta } from "./types";

export const getAttributeValue = (attr: string, meta: TokenMeta) => {
  const target = meta.attributes.find((attributeObj) => {
    return attributeObj.trait_type === attr;
  });

  return target?.value || "--";
};
