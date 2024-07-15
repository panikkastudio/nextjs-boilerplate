import createMDX from "@next/mdx";

/**
 * @type {import('next').NextConfig}
 */
const config = {
    reactStrictMode: true,
    transpilePackages: ["@repo/database"],
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
    //
});

export default withMDX(config);
