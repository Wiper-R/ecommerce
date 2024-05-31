/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**",
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: []
        }
    }
};

export default nextConfig;
