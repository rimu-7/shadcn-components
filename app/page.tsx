import Container from "@/components/Container";
import { GithubHeatMap } from "@/registry2/new-york/components/github-heatmap";

export default function Home() {
  return (
    <Container>
      <GithubHeatMap username="rimu-7" />
    </Container>
  );
}
