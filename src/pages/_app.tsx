import { AppProps } from "next/app";
import "../styles/globals.css";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { getCookie, setCookies } from "cookies-next";
import { useState } from "react";
import { GetServerSidePropsContext } from "next/types";
import { trpc } from "../utils/trpc";
import { Notifications } from "@mantine/notifications";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { SessionProvider } from "next-auth/react";
import { User } from "next-auth";

function App({
  pageProps,
  Component,
}: AppProps & {
  pageProps: {
    user: User;
    initialColorScheme: ColorScheme;
    session: any;
  };
}) {
  const preferedColorScheme = useColorScheme(pageProps.initialColorScheme);
  const [colorScheme, setColorScheme] = useState(preferedColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  console.log(pageProps);
  return (
    <SessionProvider session={pageProps.session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <Notifications />
          <Component {...pageProps} user={pageProps.user} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  if (!ctx?.req) {
    return {
      colorScheme: "light",
      props: {},
    };
  }
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const PublicPages = ["/", "/signin", "/signup"];

  console.log(session);

  if (!PublicPages.includes(ctx?.req?.url ?? "")) {
    if (!session) {
      console.log(ctx.req.url);
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
  }

  if (!session)
    return {
      initialColorScheme: getCookie("mantine-color-scheme", ctx) || "light",
      session: null,
      user: null,
    };

  if (session && ctx.req.url === "/login") {
    ctx.res.writeHead(302, { Location: "/dashboard" });
    ctx.res.end();
  }

  return {
    pageProps: {
      initialColorScheme: getCookie("mantine-color-scheme", ctx) || "light",
      session,
      user: session?.user ?? null,
    },
  };
};

export default trpc.withTRPC(App);
