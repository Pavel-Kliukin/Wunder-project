import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { drupal } from "@/lib/drupal/drupal-client";

import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:

  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  // if there is no session, return 401:

  // const session = await getServerSession(req, res, authOptions);
  // console.log(session);

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);
      const body = JSON.parse(req.body);

      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: "contact",
          ...body,
        }),
        headers: {
          "Content-Type": "application/json",
          // Pass the token to authenticate the request:
        },
      });

      if (result.ok) {
        res.status(200).end();
      } else {
        res.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
