import React from "react";
import Layout from "./Layout";
import AboutBg from "/Public/Images/about_bg.jpg";

const Services = () => {
  return (
    <Layout>
      <section
        style={{ backgroundImage: `url(${AboutBg})` }}
        className="min-h-screen w-full flex flex-col items-center justify-center text-center"
      >
        <div
          style={{
            backgroundColor: "#819ea2",
            color: "black",
            borderRadius: "45px",
            boxShadow: "20px 20px 15px 10px rgba(0,0,0,0.7)",
          }}
          className="h-auto w-11/12 md:w-3/4 lg:w-2/4 p-6"
        >
          <h2 className="text-4xl font-body mt-10">How It Works</h2>

          <div className="flex flex-col items-start mt-9">
            <div className="flex items-center w-full mb-6">
              <img
                src="https://coox-beta.s3.ap-south-1.amazonaws.com/images/website/icons/male_chef.svg"
                className="mr-4 h-10"
                alt="Chef arrives at Home"
              />
              <span className="text-base md:text-lg">Chef arrives at Home</span>
            </div>
            <div className="flex items-center w-full mb-6">
              <img
                src="https://coox-beta.s3.ap-south-1.amazonaws.com/images/website/icons/hot_and_fresh.png"
                className="mr-4 h-10"
                alt="Prepares dishes using your Ingredients and Appliances"
              />
              <span className="text-base md:text-lg">
                Prepares dishes using Our Ingredients and Appliances
              </span>
            </div>
            <div className="flex items-center w-full mb-6">
              <img
                src="https://coox-beta.s3.ap-south-1.amazonaws.com/images/website/icons/clean_kitchen.png"
                className="mr-4 h-10"
                alt="Cleans Kitchen after the service and leaves"
              />
              <span className="text-base md:text-lg">
                Cleans Kitchen after the service and leaves
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
