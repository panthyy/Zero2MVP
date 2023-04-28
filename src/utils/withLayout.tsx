import {
  AppShell,
  Aside,
  Burger,
  Header as MantineHeader,
  Footer,
  MediaQuery,
  Navbar,
  useMantineTheme,
  Text,
  Flex,
  Container,
} from "@mantine/core";
import { Header } from "@components/index";
import { useState } from "react";
import { FooterSimple } from "../components/Footer";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={<FooterSimple links={[]} />}
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};
export const withLayout = (
  Component: (props: any) => JSX.Element,
  Layout: (props: any) => JSX.Element = DefaultLayout
) => {
  return (props: any) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
