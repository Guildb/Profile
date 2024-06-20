import React from "react";

const ContactInfo = ({ email, phone }) => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">Contact</h2>
      <div className="text-center my-4">
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
