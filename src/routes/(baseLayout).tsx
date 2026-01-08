import { JSX } from "solid-js";
import Nav from "~/components/Nav";


export default function BaseLayout({ children }: { children: JSX.Element }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}