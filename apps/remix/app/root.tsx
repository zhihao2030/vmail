import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "./tailwind.css";
import icon from './favicon-32x32.png'
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  return json({ locale });
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: icon}
];

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
      {/* Google Analytics */}
      {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4H800SD2DB"></script>
      <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-4H800SD2DB');
            `,
          }}></script> */}
    </head>
    <body className="">
    <Outlet/>
    <ScrollRestoration/>
    <Scripts/>
    <LiveReload/>
    <iframe title="333" src="https://oc-cdn-public-eur.azureedge.net/livechatwidget/v2public/htmls/chatv2.html?data-app-id=ca940016-34cf-47ec-ac9a-3aeb97845e44&data-org-id=dc716e56-5205-ee11-a66d-000d3a64d66c&data-org-url=https://m-dc716e56-5205-ee11-a66d-000d3a64d66c.eu.omnichannelengagementhub.com&hostname=www.zim.com&data-lcw-version=prod&data-font-family-override=ArialHelvetica,Helvetica,Arial,sans-serif&data-color-override=%23212b60&data-customization-callback=%7B%22styleProps%22%3A%7B%22generalStyles%22%3A%7B%22borderRadius%22%3A%2220px%20205px%200px%200px%22%7D%2C%22iconStyleProps%22%3A%7B%22styleProps%22%3A%7B%22generalStyleProps%22%3A%7B%22width%22%3A%22300px%22%2C%22height%22%3A%22300px%22%7D%7D%7D%7D%2C%22headerProps%22%3A%7B%22styleProps%22%3A%7B%22iconStyleProps%22%3A%7B%22height%22%3A%2245px%22%2C%22width%22%3A%2250px%22%7D%2C%22generalStyleProps%22%3A%7B%22borderRadius%22%3A%2220px%2020px%200px%200px%22%7D%7D%7D%2C%22chatButtonProps%22%3A%7B%22styleProps%22%3A%7B%22generalStyleProps%22%3A%7B%22minWidth%22%3A%2260px%22%2C%22width%22%3A%2260px%22%2C%22height%22%3A%2260px%22%7D%2C%22iconStyleProps%22%3A%7B%22width%22%3A%22250px%22%2C%22borderRadius%22%3A%22100px%20100px%20100px%2099px%22%2C%22backgroundImage%22%3A%22url(https%3A%2F%2Foc-cdn-ocprod.azureedge.net%2Flivechatwidget%2Fimages%2FchatIcon.svg)%22%7D%7D%2C%22controlProps%22%3A%7B%22hideChatSubtitle%22%3Atrue%2C%22hideChatTextContainer%22%3Atrue%2C%22dir%22%3A%22ltr%22%7D%7D%2C%22loadingPaneProps%22%3A%7B%22controlProps%22%3A%7B%22titleText%22%3A%22Welcome%22%2C%22subtitleText%22%3A%22ZIM%20chat%22%2C%22spinnerText%22%3A%22Loading...%22%7D%7D%2C%22webChatContainerProps%22%3A%7B%22renderingMiddlewareProps%22%3A%7B%22avatarStyleProps%22%3A%7B%22backgroundImage%22%3A%22url('https%3A%2F%2Fwww.zim.com%2Fassets%2Fjsonhduf%2Fcaptinz.png')%22%2C%22backgroundSize%22%3A%22cover%22%2C%22backgroundColor%22%3A%22white%22%7D%2C%22avatarTextStyleProps%22%3A%7B%22display%22%3A%22none%22%7D%7D%7D%7D"></iframe>
    </body>
    </html>
  );
}
