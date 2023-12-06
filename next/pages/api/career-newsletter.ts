import { NextApiRequest, NextApiResponse } from "next";

import { drupal } from "@/lib/drupal/drupal-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const languagePrefix = req.headers["accept-language"];

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);
      const body = JSON.parse(req.body);

      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: body.webform_id,
          email: body.email,
          policy_checkbox: body.policy_checkbox,
        }),
        headers: {
          "Content-Type": "application/json",
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
