import CardContainer from "./components/Container/CardContainer";
import Navbar from "./components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CardContainer location="Home" />
    </>
  );
}
