// 在 layout.tsx 用 Providers component wrap body tag 會報錯: the entire root will switch to client rendering.
// 所以改在layout.tsx 用 Providers component wrap body tag 裡的 div tag
// 但還是會在 console 出現警告 Warning: Extra attributes from the server: class,style
import "../styles/globals.css";
import Header from "./Header";
import Providers from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <div className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700">
            <Header />
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </Providers>
      </body>
      {/* <body>
        {children}
      </body> */}
    </html>
  );
}
