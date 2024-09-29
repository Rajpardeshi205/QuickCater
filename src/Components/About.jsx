import React from "react";
import Layout from "./Layout";
import AboutBg from "/Public/Images/about_bg.jpg";

const About = () => {
  return (
    <Layout>
      <section
        className="bg-cover h-screen w-full flex items-center"
        style={{ backgroundImage: `url(${AboutBg})` }}
      >
        <div className="text-justify max-w-3xl mx-auto px-4 py-3">
          <p className="pb-4 text-center text-lg md:text-xl">
            We don't count calories; we create memories
          </p>
          <p className="pb-4 text-base md:text-lg">
            QuickCater is a premier catering company in Mumbai that incorporates
            excellence in food quality, flawless service, and brings in new,
            exciting standards in the catering world. We provide specialized
            catering services in Mumbai for a variety of events, corporate or
            social, big and small.
          </p>
          <p className="pb-4 text-base md:text-lg">
            We're one of the specialists in designing a bespoke menu for your
            style of event. Whether you're planning a swanky birthday party or
            corporate gala dinner, lavish weddings, or luxuriant yacht parties,
            we can design a menu that can suit your style and tailored to your
            needs. We're well-known for our outstanding catering services,
            delicious cuisine, and proper planning so that your event is
            executed elegantly - the way you dreamt for it.
          </p>
          <p className="pb-4 text-base md:text-lg">
            QuickCater has the potential to deliver an excellent quality of food
            with impeccable service standards. Our passion for food is what sets
            our menu apart. Our team pride themselves on offering bespoke and
            innovative food cuisine, menus for weddings, social parties,
            concerts and shows, corporate events, and more. Quality is beyond
            quantity for us, and we pick the best product, ensuring the
            freshness and uniqueness to design innovative menus. We deploy
            highly experienced Chef Personnel and sophisticated cooking tools in
            our catering arsenal to combat with any kind of event needs and
            ensure its fully met.
          </p>
          <p className="pb-4 text-base md:text-lg">
            Over the time, QuickCater has created its own unique identity and
            reputation as one of the top caterers in Mumbai. We've organized
            many exclusive private and corporate catering events, and mostly the
            preferred choice when it comes to design a memorable event across
            Mumbai. Our dazzling sundowners and yacht parties will revive your
            heart. We hold immense experience in delivering impeccable catering
            for home parties, corporate events, and wedding celebrations.
          </p>

          <p className="text-center text-lg md:text-xl">
            Are you looking for the best caterers in Mumbai? Don't worry! Your
            search ends with us.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
