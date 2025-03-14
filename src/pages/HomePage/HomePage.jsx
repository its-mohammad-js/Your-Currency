import CoinsRateSection from "./CoinsRateSection/CoinsRateSection";
import HomePageHero from "./HeroSection/HomePageHero";
import IntroduceDeveloperSection from "./IntroducingDevSection/IntroduceDeveloperSection";
import UseCases from "./UseCases/UseCases";

function HomePage() {
  return (
    <>
      <HomePageHero />
      <CoinsRateSection />
      <UseCases />
{/*       <IntroduceDeveloperSection /> */}
    </>
  );
}

export default HomePage;
