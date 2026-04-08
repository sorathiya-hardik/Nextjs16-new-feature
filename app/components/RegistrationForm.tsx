"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  ValidationError,
  ErrorResponse,
  RegisterSuccessResponse,
} from "@/app/types/register";

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateName = (name: string): string | null => {
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must not exceed 50 characters";
    return null;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter";
    if (!/[0-9]/.test(password)) return "Must contain at least one number";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
    setFormError(null);

    // Real-time validation
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value) {
        delete newErrors.name;
      } else {
        const nameError = validateName(value);
        if (nameError) {
          newErrors.name = nameError;
        } else {
          delete newErrors.name;
        }
      }
    }

    if (name === "email") {
      if (!value) {
        delete newErrors.email;
      } else if (!validateEmail(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (!value) {
        delete newErrors.password;
      } else {
        const passwordError = validatePassword(value);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          delete newErrors.password;
        }
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    // Validate name
    if (!form.name) {
      newErrors.name = "Name is required";
    } else {
      const nameError = validateName(form.name);
      if (nameError) newErrors.name = nameError;
    }

    // Validate email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(form.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setFormError(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data: RegisterSuccessResponse = await response.json();
        setSuccess(true);
        setForm({ name: "", email: "", password: "" });
        setErrors({});
      } else if (response.status === 409) {
        // Duplicate email
        setErrors({
          email: "This email is already registered. Try logging in instead.",
        });
      } else {
        const data: ErrorResponse = await response.json();
        if (data.details) {
          const fieldErrors: Errors = {};
          data.details.forEach((error: ValidationError) => {
            fieldErrors[error.field as keyof Errors] = error.message;
          });
          setErrors(fieldErrors);
        } else {
          setFormError(data.error);
        }
      }
    } catch (error) {
      setFormError("Registration failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Account</h1>

        {success && (
          <div
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
            role="status"
            aria-live="polite"
          >
            <div className="flex gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-green-900">
                  Account created successfully!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Check your email for activation instructions.
                </p>
                <Link
                  href="/"
                  className="text-green-600 hover:text-green-700 hover:underline text-sm mt-2 inline-block font-medium"
                >
                  Go to Home →
                </Link>
              </div>
            </div>
          </div>
        )}

        {formError && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-red-800 text-sm">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "password-error" : "password-requirements"
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter secure password"
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.password}
              </p>
            )}

            {/* Password Requirements Checklist */}
            {form.password && (
              <div
                id="password-requirements"
                className="mt-3 text-sm space-y-2"
              >
                <div
                  className={
                    form.password.length >= 8
                      ? "text-green-600"
                      : "text-gray-600"
                  }
                  aria-live="polite"
                >
                  {form.password.length >= 8 ? "✓" : "○"} At least 8 characters
                </div>
                <div
                  className={
                    /[A-Z]/.test(form.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }
                  aria-live="polite"
                >
                  {/[A-Z]/.test(form.password) ? "✓" : "○"} One uppercase letter
                </div>
                <div
                  className={
                    /[0-9]/.test(form.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }
                  aria-live="polite"
                >
                  {/[0-9]/.test(form.password) ? "✓" : "○"} One number
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin text-lg">⚙️</span>
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
