import './globals.css';

export const metadata = {
  title: 'WhatsApp Bot Deployer',
  description: 'Deploy your WhatsApp bot via Render backend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
