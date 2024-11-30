// app/metadata.ts

export const metadata = {
  title: "Green Garden",
  description: "Welcome to Green Garden, your source for fresh plants and gardening tips.",
  keywords: "plants, gardening, fresh, green garden, home garden",
  openGraph: {
    title: "Green Garden",
    description: "Explore our wide range of fresh plants and gardening tips.",
    url: "https://greengarden.com",  // Update with your actual URL
    site_name: "Green Garden",
    images: [
      {
        url: "/images/og-image.jpg", // Your Open Graph image path
        width: 1200,
        height: 630,
        alt: "Green Garden Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Garden",
    description: "Discover fresh plants and gardening advice at Green Garden.",
    image: "/images/og-image.jpg", // Your Twitter image path
  },
};
