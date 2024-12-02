import Main from "@/components/main";
import Sponsor from "@/components/Sponsor";
import Teachings from "@/components/Teachings";
import His from "@/components/His";
import Services from "@/components/Services";
import Donation from "@/components/Donation";

export default function Home() {
  return (
    <>
      <Main />
      <Services />
      <Teachings />
      <His />
      <Donation />
      <Sponsor />
    </>
  );
}
