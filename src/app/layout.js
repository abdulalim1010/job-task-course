// src/app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "JobTaskCourse",
  description: "Learn and grow with JobTaskCourse",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Geist Sans', 'Geist Mono', sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
