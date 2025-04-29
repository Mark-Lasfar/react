import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>
          {process.env.NODE_ENV === 'development'
            ? '[DEV] React Compiler Playground'
            : 'React Compiler Playground'}
        </title>

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="React Compiler Playground - Experiment with React code in a browser environment"
        />
        <meta
          name="robots"
          content="index, follow"
        />
        <meta name="author" content="Meta Platforms, Inc." />

        {/* Favicon and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload Fonts for Performance */}
        <link
          rel="preload"
          href="/fonts/Source-Code-Pro-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Optimistic_Display_W_Lt.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans h-screen overflow-y-hidden">{children}</body>
    </html>
  );
}