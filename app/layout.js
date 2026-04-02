import "./globals.css";

export const metadata = {
  title: "Check Card EJP Cergy",
  description: "Carte de versets avec QR code"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
