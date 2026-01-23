import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { cn } from "../../lib/utils";

// Get your access key from https://web3forms.com/ (enter infoitwasco@gmail.com)
const WEB3FORMS_ACCESS_KEY = "0faa4b5b-9a93-4f19-80c1-c1fa1b22bfbc";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "ITWASCO Website",
          subject: `[ITWASCO Contact] ${data.subject}`,
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          inquiry_type: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          className={cn("mt-1", errors.name && "border-red-500")}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          className={cn("mt-1", errors.email && "border-red-500")}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="0712 345 678"
          className="mt-1"
          {...register("phone")}
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          className={cn(
            "mt-1 flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm",
            "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            errors.subject && "border-red-500"
          )}
          {...register("subject", { required: "Please select a subject" })}
        >
          <option value="">Select a subject...</option>
          <option value="general">General Inquiry</option>
          <option value="connection">New Connection Request</option>
          <option value="billing">Billing Question</option>
          <option value="complaint">Service Complaint</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          className={cn("mt-1", errors.message && "border-red-500")}
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Message must be at least 10 characters" },
          })}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
          <p className="font-medium">Message sent successfully!</p>
          <p className="mt-1">We'll get back to you as soon as possible.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Failed to send message</p>
          <p className="mt-1">Please try again or contact us directly.</p>
        </div>
      )}
    </form>
  );
}
