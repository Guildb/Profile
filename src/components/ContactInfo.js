import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import emailjs from "emailjs-com";

const ContactInfo = () => {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    <div
      className={`max-w-md mx-auto p-4 shadow-md rounded-lg ${
        darkMode ? "bg-slate-700" : "bg-slate-100"
      }`}
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
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
