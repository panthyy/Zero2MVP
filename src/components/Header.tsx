import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  HoverCard,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Header as MantineHeader } from "@mantine/core";
import { IconColorSwatch, IconMoon, IconSettings, IconSun, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { css } from "@emotion/react";
import { useHover } from "@mantine/hooks";
import { signIn, signOut } from "next-auth/react";
import { useUser } from "../hooks/useUsers";

const ToggleColorSchemaButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <ActionIcon
      mr="lg"
      sx={{
        borderColor: colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
        padding: 2,
      }}
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
    </ActionIcon>
  );
};

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Button
      onClick={handleLogout}
      sx={{
        "&:hover": {
          backgroundColor: "red",
          color: "white",
          cursor: "pointer",
        },
        "&": {
          backgroundColor: "transparent",
          border: "2px solid red",
          color: "red",
          cursor: "pointer",
        },
      }}
    >
      <Text>Logout</Text>
    </Button>
  );
};

const Profile = () => {
  const user = useUser();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div style={{ position: "relative" }}>
      <Avatar radius="xl" variant="gradient" pos="relative">
        <span
          style={{
            lineHeight: 0,
          }}
        >
          {user?.email?.split("@")[0].slice(0, 2)}
        </span>
      </Avatar>
      <Menu shadow="md" position="bottom-end" width={200}>
        <Menu.Target>
          <Flex
            sx={{
              "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)",
              },
              position: "absolute",
              bottom: -5,
              right: -5,
            }}
          >
            <IconSettings
              fill={theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9]}
              color={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0]}
            />
          </Flex>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            display="flex"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={<IconUser />}
          >
            <Link href="/account">
              <Text>Account settings</Text>
            </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item component="div">
            <Flex align="center" justify="space-between">
              <ToggleColorSchemaButton />
              <LogoutButton />
            </Flex>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

const HeaderButtons = () => {
  return (
    <Group>
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </Button>
    </Group>
  );
};

export const Header = () => {
  const user = useUser();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const MenuChoices = [
    {
      name: "Pricing",
      href: "/pricing",
      visible: !user && router.pathname !== "/pricing",
    },

    {
      name: "Dashboard",
      href: "/dashboard",
      visible: user && router.pathname !== "/dashboard",
    },
  ];

  return (
    <MantineHeader
      height={82}
      px={40}
      w="100%"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1>QueueLine</h1>
      </Link>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <nav
          style={{
            width: "100%",
            padding: "0 2rem",
          }}
        >
          {...MenuChoices.reduce((acc: React.ReactNode[], choice) => {
            if (choice.visible) {
              acc.push(
                <Link
                  href={choice.href}
                  key={choice.name}
                  style={{ display: "inline-block", marginRight: "1rem" }}
                >
                  {choice.name}
                </Link>
              );
            }
            return acc;
          }, [])}
        </nav>
      </MediaQuery>

      {opened && (
        <Navbar p="md" hidden={!opened}>
          <nav
            style={{
              width: "100%",
              padding: "0 2rem",
            }}
          >
            {...MenuChoices.reduce((acc: React.ReactNode[], choice) => {
              if (choice.visible) {
                acc.push(
                  <Link
                    href={choice.href}
                    key={choice.name}
                    style={{ display: "inline-block", marginRight: "1rem" }}
                  >
                    {choice.name}
                  </Link>
                );
              }
              return acc;
            }, [])}
          </nav>
        </Navbar>
      )}

      <Flex align="center">
        {user && <Profile />}
        {!user && <HeaderButtons />}
      </Flex>
    </MantineHeader>
  );
};
