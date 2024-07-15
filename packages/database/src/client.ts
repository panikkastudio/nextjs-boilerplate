import { PrismaClient } from "@prisma/client";

declare global {
    namespace PrismaJson {
        type ActivePackages = {
            [key: string]: number;
        };

        type Images = {
            urls: string[];
        };

        type Timestamps = {
            words: {
                start: number;
                end: number;
            }[];
        };

        type Scenes = {
            text: string;
            start: number;
            end: number;
            image: string;
            words: {
                start: number;
                end: number;
                word: string;
            }[];
        }[];
    }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    //
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }

    prisma = (global as any).prisma;
}

export { prisma };
export * from "@prisma/client";
