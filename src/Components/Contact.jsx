import React, { useState } from "react";
import Layout from "./Layout";
import AboutBg from "../Images/about_bg.jpg";
import { Button, Input } from "@material-tailwind/react";
import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date(),
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
      });

      toast.success("Your message has been submitted!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting your message. Please try again later.");
    }
  };

  return (
    <Layout>
      <section
        className="bg-cover min-h-screen w-full flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${AboutBg})` }}
      >
        <h1 className="text-4xl mb-8">Connect With Us</h1>
        <div className="flex flex-col items-center z-10 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-96">
              <Input
                type="text"
                color="black"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-96">
              <Input
                type="tel"
                color="black"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-96">
              <Input
                type="email"
                color="black"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-96">
              <Input
                type="text"
                color="black"
                label="Type of Event"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button type="submit" className="bg-red-800 w-96">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
