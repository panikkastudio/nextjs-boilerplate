export const config = {
    // prettier-ignore
    stage:  process.env.NODE_ENV === "production"
        ? "production"
        : "development" as 'production' | 'development',
};
