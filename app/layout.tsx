import "./styles/globals.css";
// import type { AppType } from "next/dist/shared/lib/utils";

// const MyApp: AppType = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />;
// };

// export default MyApp;

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}