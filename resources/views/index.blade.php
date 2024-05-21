<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Donamix</title>
    <script
      src="https://widget.cloudinary.com/v2.0/global/all.js"
      type="text/javascript"
    ></script>
    <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
    <script type="module" src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    @vite('resources/css/app.css')
  </head>
  <body>
    <div id="root"></div>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
  </body>
</html>
