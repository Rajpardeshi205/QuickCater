import React from "react";
import { SlEnvolope } from "react-icons/sl";
import { IoCall } from "react-icons/io5";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "white" }}>
      <div className="flex flex-col lg:flex-row justify-between items-start p-10">
        <aside className="lg:w-1/2 text-justify mb-8 lg:mb-0">
          <h2 className="text-center text-2xl mb-6">QuickCater</h2>
          <p>
            QuickCater is a premier catering company in Mumbai that incorporates
            excellence in food quality, flawless service, and brings in new,
            exciting standards in the catering world. We provide specialized
            catering services in Mumbai for a variety of events, corporate or
            social, big and small.
          </p>
          <h2 className="text-center text-2xl mt-6">Follow Us</h2>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="/facebook">
              <img
                src="https://soulchef.in/Content/images/facebook.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="/insta">
              <img
                src="https://soulchef.in/Content/images/insta.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
            <a href="/linkdin">
              <img
                src="https://soulchef.in/Content/images/linkdin.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
            <a href="/youtube">
              <img
                src="https://soulchef.in/Content/images/youtube.png"
                alt="YouTube"
                className="w-8 h-8"
              />
            </a>
          </div>
        </aside>

        <aside className="lg:w-1/2 text-right ">
          <h2 className="text-2xl mb-6">Contact Us</h2>
          <address className="leading-relaxed">
            132, Modi St, 1st floor, <br />
            Shabaz apartment, Borabazar, <br />
            Fort, Mumbai, Maharashtra 400001 <br />
            <div className="flex flex-col items-end space-y-2">
              <a
                href="mailto:contactus@quickcater.in"
                className="flex items-center  mt-2 space-x-2"
              >
                <SlEnvolope />
                <span>contactus@quickcater.in</span>
              </a>
              <a
                href="tel:+9198xxxxxx92"
                className="flex items-center space-x-2"
              >
                <IoCall />
                <span>+91 98xxxxxx92</span>
              </a>
            </div>
          </address>
        </aside>
      </div>
      <div
        style={{ backgroundColor: "#0b3c54", color: "white" }}
        className="flex justify-center items-center space-x-2 h-14"
      >
        <FaRegCopyright />
        <span>
          Copyright 2024. All rights reserved. Website Developed and Maintained
          by PlayerX
        </span>
      </div>
    </footer>
  );
};

export default Footer;
