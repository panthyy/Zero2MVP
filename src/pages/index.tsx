import { withLayout } from "../utils/withLayout";
import { Container } from "@mantine/core";

function Home() {
  return (
    <>
      <Container
        sx={{
          "@media (max-width: 768px)": {
            marginBottom: "50px",
            marginTop: "30px",
          },

          marginTop: "60px",
          marginBottom: "100px",
        }}
      ></Container>
    </>
  );
}

export default withLayout(Home);
