import { Inter } from "@next/font/google";

import "@/styles/reset.css";
import "@/styles/global.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AuthProvider } from "@/AuthContext";
config.autoAddCss = false;

const interFontFamily = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interFontFamily.className}>
      <head>
        <title>NETFILMS</title>
      </head>
      <body className="container">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
