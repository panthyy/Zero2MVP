import type { GetServerSidePropsContext } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Flex } from "@mantine/core";

export default function SignIn(props: any) {
  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      {props.providers &&
        Object.values(props.providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "/dashboard",
                })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </Flex>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
