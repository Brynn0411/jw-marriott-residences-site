import "./globals.css";

export const metadata = {
  title: "JW Marriott Residences | Downtown Orlando",
  description:
    "Register interest for luxury condominium residences above JW Marriott Orlando.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
