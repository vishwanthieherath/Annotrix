import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dimen - Annotation Tool",
  description: "Dimen Annotation Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
