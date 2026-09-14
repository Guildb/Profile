import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";

const FIELD_ERRORS = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  message: "Please enter a message.",
};

// `:user-invalid` (Baseline widely available) drives the visible styling in
// index.css, but it carries no ARIA semantics of its own. jsdom's selector
// engine doesn't recognise it either, so this falls back to `:invalid` there
// (and in any browser old enough not to support it) rather than throwing.
const matchesInvalid = (input) => {
  try {
    return input.matches(":user-invalid");
  } catch {
    return input.matches(":invalid");
  }
};

const ErrorIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ContactInfo = () => {
  const inputClass =
    "field-input w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/50";

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Replaces the previous trio of notification useStates: 'idle' | 'sending' | 'sent' | 'error'.
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clears a stale invalid flag as soon as the field becomes valid again,
    // without waiting for the next blur.
    const input = e.target;
    if (input.checkValidity() && !matchesInvalid(input)) {
      input.setAttribute("aria-invalid", "false");
    }
  };

  const syncAriaInvalid = (e) => {
    const input = e.target;
    input.setAttribute("aria-invalid", matchesInvalid(input) ? "true" : "false");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Renato",
      message: formData.message,
    };

    emailjs
      .send("service_bkaj0bm", "template_j2j5l3s", templateParams, "9lfsIIL0iH2_xrsfG")
      .then(() => {
        // A plain state reset empties the inputs but leaves the browser's
        // per-field "user has interacted" flag set, so a required field left
        // blank would still render :user-invalid next to the success
        // message. The native form reset clears that flag along with the
        // values; the state reset keeps React's controlled inputs in sync.
        formRef.current?.reset();
        formRef.current
          ?.querySelectorAll("[aria-invalid]")
          .forEach((field) => field.setAttribute("aria-invalid", "false"));
        setFormData({ name: "", email: "", phone: "", message: "" });
        setStatus("sent");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const renderField = ({ id, label, type, required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          onBlur={syncAriaInvalid}
          className={inputClass}
          rows="5"
          required={required}
          aria-errormessage={`${id}-error`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          onBlur={syncAriaInvalid}
          className={inputClass}
          required={required}
          aria-errormessage={`${id}-error`}
        />
      )}
      {FIELD_ERRORS[id] && (
        <p id={`${id}-error`} className="field-error mt-2 items-center gap-1.5 text-sm text-accent">
          <ErrorIcon />
          <span>{FIELD_ERRORS[id]}</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="py-12 px-4">
      <SectionHeading id="contact-info-heading" eyebrow="Get in touch" title="Contact Me" />
      <Reveal as="div" className="mx-auto max-w-xl">
        <GlassPanel className="p-6 text-ink sm:p-8">
          {status === "sent" && (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-xl border border-hairline bg-canvas px-5 py-4 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 text-aurora2"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="font-semibold text-ink">Message sent — thanks for reaching out!</p>
            </div>
          )}
          {status === "error" && (
            <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-hairline bg-canvas px-5 py-4 text-sm">
              <ErrorIcon className="h-6 w-6 shrink-0 text-accent" />
              <p className="font-semibold text-ink">
                Failed to send message. Please try again later.
              </p>
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit}>
            {renderField({ id: "name", label: "Name", type: "text" })}
            {renderField({ id: "email", label: "Email", type: "email" })}
            {renderField({
              id: "phone",
              label: "Phone Number (Optional)",
              type: "tel",
              required: false,
            })}
            {renderField({ id: "message", label: "Message", type: "textarea" })}
            <div className="text-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-gradient-to-r from-aurora1 to-aurora2 px-4 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </GlassPanel>
      </Reveal>
    </div>
  );
};

export default ContactInfo;
