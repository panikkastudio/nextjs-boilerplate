export enum ScheduleVideoEnum {
    ONCE_EVERY_TWO_DAYS = "ONCE_EVERY_TWO_DAYS",
    ONCE_A_DAY = "ONCE_A_DAY",
    TWICE_A_DAY = "TWICE_A_DAY",
}

export enum WorkflowType {
    GenerateVideoScript = "GenerateVideoScript",
    GenerateVideo = "GenerateVideo",
    PublishVideo = "PublishVideo",
    RefreshToken = "RefreshToken",
}

export enum GeneratedVideoStatusEnum {
    Scheduled = "Scheduled",
    Scripting = "Scripting",
    Scripted = "Scripted",
    Generating = "Generating",
    Generated = "Generated",
    Publishing = "Publishing",
    Published = "Published",
}

export enum NarratorEnum {
    Alloy = "Alloy",
    Echo = "Echo",
    Fable = "Fable",
    Onyx = "Onyx",
    Nova = "Nova",
    Shimmer = "Shimmer",
}

export enum ContentTypeEnum {
    Random_Al_Story = "Random AI Story",
    Scary_Stories = "Scary Stories",
    Motivational = "Motivational",
    Bedtime_Stories = "Bedtime Stories",
    Interesting_History = "Interesting History",
    Fun_Facts = "Fun Facts",
    Long_Form_Jokes = "Long Form Jokes",
    Life_Pro_Tips = "Life Pro Tips",
    ELI5 = "ELI5",
    Philosophy = "Philosophy",
    Product_Marketing = "Product Marketing",
    Custom = "Custom",
}

export enum ProjectLanguageEnum {
    English = "English",
    Czech = "Czech",
    Danish = "Danish",
    Dutch = "Dutch",
    French = "French",
    German = "German",
    Greek = "Greek",
    Hindi = "Hindi",
    Indonesian = "Indonesian",
    Italian = "Italian",
    Japanese = "Japanese",
    Korean = "Korean",
    Norwegian = "Norwegian",
    Polish = "Polish",
    Portuguese = "Portuguese",
    Russian = "Russian",
    Spanish = "Spanish",
    Swedish = "Swedish",
    Turkish = "Turkish",
    Ukrainian = "Ukrainian",
}

export enum ProjectPackagesEnum {
    CONSISTENT = "CONSISTENT",
    DAILY = "DAILY",
    POWER = "POWER",
}

export const STRIPE_PRICE_IDS = {
    development: {
        [ProjectPackagesEnum.CONSISTENT]: "price_1P1ReVKNJQAoilSEK9yTbOWF",
        [ProjectPackagesEnum.DAILY]: "price_1P1RemKNJQAoilSEFZDSo7ml",
        [ProjectPackagesEnum.POWER]: "price_1P1RfOKNJQAoilSERxQYrvKh",
    },
    production: {
        [ProjectPackagesEnum.CONSISTENT]: "price_1P9nARKNJQAoilSEynbO9Iee",
        [ProjectPackagesEnum.DAILY]: "price_1P9nAQKNJQAoilSEWC9Fljmn",
        [ProjectPackagesEnum.POWER]: "price_1P9nAOKNJQAoilSEmgmbh8s5",
    },
};

export const STRIPE_PRICE_IDS_LOOKUP = {
    development: Object.fromEntries(
        Object.keys(STRIPE_PRICE_IDS.development).map((key: any) => {
            return [STRIPE_PRICE_IDS.development[key as ProjectPackagesEnum], key];
        }),
    ),
    production: Object.fromEntries(
        Object.keys(STRIPE_PRICE_IDS.production).map((key: any) => {
            return [STRIPE_PRICE_IDS.production[key as ProjectPackagesEnum], key];
        }),
    ),
};
