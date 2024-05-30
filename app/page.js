import CardContainer from "./components/Container/cardContainer";
import Navbar from "./components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CardContainer location="Home" />
    </>
  );
}
