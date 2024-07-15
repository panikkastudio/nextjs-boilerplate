import cuid from "@paralleldrive/cuid2";
import { NextApiRequest, NextApiResponse } from "next";

import { config } from "./config";
// import { client } from "./storage";

type Configure = (options: Options) => Handler;
type Handler = NextRouteHandler & { configure: Configure };
type NextRouteHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
type Options = { key?: (req: NextApiRequest, filename: string) => string | Promise<string> };

const makeRouteHandler = (options: Options = {}): Handler => {
    const route: NextRouteHandler = async function (req, res) {
        // let bucket = config.s3.bucket;
        // let filename = req.body.filename;
        // let key = options.key ? await options.key(req, filename) : `next-s3-uploads/${cuid.createId()}/${filename.replace(/\s/g, "-")}`;
        // const url = await client.presignedUrl("PUT", config.s3.bucket, key);

        // res.status(200).json({
        //     url,
        //     key,
        //     bucket,
        //     region: process.env.S3_UPLOAD_REGION,
        // });

        res.status(200).json({ message: "Hello" });
    };

    let configure = (options: Options) => makeRouteHandler(options);

    return Object.assign(route, { configure });
};

export const APIRoute = makeRouteHandler();
