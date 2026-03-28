// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>สำนักพิมพ์ชี้ดาบ - chidahp</title>
          <meta name="facebook-domain-verification" content="bcjvgx71le5tk1mlh1x1jchd8cfyla" />
          {/* Google AdSense
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647" crossorigin="anonymous"></script>
           */}
          {/* Google analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SNH03HJL2B"
          ></script>
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SNH03HJL2B');
          `}</script>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
