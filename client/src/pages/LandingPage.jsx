import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import LandingPageMain from "./../component/main/LandingPageMain";

export default function LandingPage() {
  return (
    <section className=" h-screen w-full">
      <Header />
      <LandingPageMain />
      <Footer />
    </section>
  );
}
