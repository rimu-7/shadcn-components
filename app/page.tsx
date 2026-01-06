import Container from "@/components/Container";
import { GithubHeatMap } from "@/registry/components/github-heatmap";
import { TextWritingEffect } from "@/registry/components/text-writing-effect";

export default function Home() {
  return (
    <Container>
      <GithubHeatMap username="rimu-7" />
      <TextWritingEffect text="Mutasim Fuad Rimu"/>
    </Container>
  );
}
