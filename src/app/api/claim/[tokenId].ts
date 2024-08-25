import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

type ClaimReqBody = {
  code: string;
  address: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { tokenId } = req.query;
  let { code, address }: ClaimReqBody = JSON.parse(req.body);
  console.log("req", req);
  console.log("tokenId", tokenId);
  console.log("code, address", code, address);
  setTimeout(() => {
    res.status(200).json({ message: "Success" });
  }, 3000);
}
