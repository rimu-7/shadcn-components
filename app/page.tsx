import Container from "@/components/Container";
import { GithubHeatMap } from "@/shadcn/components/ui/github-heat-map";

export default function Home() {
  return (
    <Container>
      <GithubHeatMap username="rimu-7" />
    </Container>
  );
}
