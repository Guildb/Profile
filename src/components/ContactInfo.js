import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import emailjs from "emailjs-com";
import SectionHeading from "./SectionHeading";

const ContactInfo = () => {
  const { darkMode } = useTheme();

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 ${
    darkMode
      ? "border-slate-600 bg-slate-800 text-white placeholder-slate-400"
      : "border-slate-300 bg-white text-slate-900 placeholder-slate-400"
  }`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: null,
    message: "",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Renato",
      message: formData.message,
    };

    emailjs
      .send(
        "service_bkaj0bm",
        "template_j2j5l3s",
        templateParams,
        "9lfsIIL0iH2_xrsfG"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setNotificationType("success");
        setNotificationMessage("Message sent successfully!");
        setShowNotification(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setNotificationType("error");
        setNotificationMessage(
          "Failed to send message. Please try again later."
        );
        setShowNotification(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <div className="py-12 px-4">
      <SectionHeading eyebrow="Get in touch" title="Contact Me" />
      <div
        className={`max-w-xl mx-auto p-6 sm:p-8 shadow-lg rounded-2xl border ${
          darkMode
            ? "border-slate-600/40 bg-slate-700/60"
            : "border-slate-200 bg-white"
        }`}
        data-aos="fade-up"
      >
      {showNotification && (
        <div className="p-4">
          <div
            className={`flex bg-white dark:bg-gray-900 items-center px-6 py-4 text-sm border-t-2 rounded-b shadow-sm ${
              notificationType === "success"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            {notificationType === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-green-500 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-red-500 stroke-current"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            )}
            <div className="ml-3">
              <div className="font-bold text-left text-black dark:text-gray-50">
                {notificationMessage}
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="phone">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-400 focus:outline-none"
          >
            Send Message
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ContactInfo;
