import './globals.css'
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'Invenire Alpha',
  description: 'Generate with love',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
