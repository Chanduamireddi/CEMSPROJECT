import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Community Event Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-light text-dark">{children}</body>
    </html>
  );
}
