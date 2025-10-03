import type { Route } from "./+types/home";
import { Scoreboard } from "../scoreboard/scoreboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ciirno Scoreboard OBS Overlay" },
    {
      name: "description",
      content:
        "Scoreboard OBS Overlay for tournaments using react created by Ciirno",
    },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from Vercel" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Scoreboard />;
}
