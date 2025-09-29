"use client";
import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { EyeOff, Eye } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    organizationLogo: null as File | null,
    description: "",
  });

  const [error, setError] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    organizationLogo: "",
    description: "",
  });

  // Password validation function
  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character";
    }

    return ""; // No error
  };

  const updateForm = (field: string, value: string) => {
    if (field === "password") {
      const passwordError = validatePassword(value);
      setError((prev) => ({ ...prev, password: passwordError }));
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError((prev) => ({
          ...prev,
          organizationLogo: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setError((prev) => ({
          ...prev,
          organizationLogo: "Only JPEG, PNG, and WebP files are allowed",
        }));
        return;
      }

      setError((prev) => ({ ...prev, organizationLogo: "" }));
      setFormData((prev) => ({ ...prev, organizationLogo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password before submission
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError((prev) => ({ ...prev, password: passwordError }));
      toast.error("Please fix password requirements before submitting");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/user", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      console.log(response);

      const signInResponse = await signIn?.create({
        identifier: formData.email,
        password: formData.password,
      });
      console.log("signInResponse", signInResponse);
      toast.success("Account created successfully!");
      setShowNextForm(true); // Show the organization form
    } catch (error: any) {
      console.log("Account creation error:", error);

      // Improved error handling
      let errorMessage = "Account creation failed!";

      if (error.response?.data?.error) {
        if (typeof error.response.data.error === "string") {
          errorMessage = error.response.data.error;
        } else if (error.response.data.error.message) {
          errorMessage = error.response.data.error.message;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrganizationSubmit = async () => {
    const errors = {
      organizationName: !formData.organizationName
        ? "Organization name is required"
        : "",
      description: !formData.description ? "Description is required" : "",
      organizationLogo: "",
    };

    setError((prev) => ({ ...prev, ...errors }));

    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const organizationFormData = new FormData();
      organizationFormData.append(
        "organizationName",
        formData.organizationName,
      );
      organizationFormData.append("description", formData.description);
      if (formData.organizationLogo) {
        organizationFormData.append(
          "organizationLogo",
          formData.organizationLogo,
        );
      }

      const response = await axios.post("/api/org", organizationFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Organization created:", response.data);
      toast.success("Organization created successfully!");

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/success?type=organization");
      }, 1500);
    } catch (error: any) {
      console.log("Organization creation error:", error);

      // Improved error handling
      let errorMessage = "Organization creation failed!";

      if (error.response?.data?.error) {
        if (typeof error.response.data.error === "string") {
          errorMessage = error.response.data.error;
        } else if (error.response.data.error.message) {
          errorMessage = error.response.data.error.message;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-100 p-6 text-black">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {showNextForm ? "Create Organization" : "Create Your Account"}
        </h1>

        {!showNextForm && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm text-black">First Name</Label>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-white/20 bg-white/10 text-black placeholder:text-gray-400"
                  required
                />
                {error.firstName && (
                  <p className="mt-1 text-sm text-red-500">{error.firstName}</p>
                )}
              </div>
              <div>
                <Label className="text-sm text-black">Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-white/20 bg-white/10 text-black placeholder:text-gray-400"
                  required
                />
                {error.lastName && (
                  <p className="mt-1 text-sm text-red-500">{error.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm text-black">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-white/20 bg-white/10 text-black placeholder:text-gray-400"
                required
              />
              {error.email && (
                <p className="mt-1 text-sm text-red-500">{error.email}</p>
              )}
            </div>
            <div>
              <Label className="text-sm text-black">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`border-white/20 bg-white/10 pr-10 text-black placeholder:text-gray-400 ${
                    error.password ? "border-red-500" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-500">{error.password}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              className="w-full bg-black font-medium text-white hover:bg-gray-800"
            >
              {isLoading ? "Please wait..." : "Create Account"}
            </Button>
          </form>
        )}

        {showNextForm && (
          <div className="space-y-4">
            {/* Organization Name Field */}
            <div>
              <Label className="text-sm text-black">Organization Name</Label>
              <Input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Enter organization name"
                className="border-white/20 bg-white/10 text-black placeholder:text-gray-400"
                required
              />
              {error.organizationName && (
                <p className="mt-1 text-sm text-red-500">
                  {error.organizationName}
                </p>
              )}
            </div>

            {/* Organization Logo Field */}
            <div>
              <Label className="text-sm text-black">Organization Logo</Label>
              <Input
                type="file"
                name="organizationLogo"
                onChange={handleFileChange}
                accept="image/*"
                className="border-white/20 bg-white/10 text-black file:mr-4 file:rounded-md file:border-0 file:bg-black/10 file:text-sm file:font-semibold file:text-black hover:file:bg-black/20"
              />
              {error.organizationLogo && (
                <p className="mt-1 text-sm text-red-500">
                  {error.organizationLogo}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Max file size: 5MB. Supported formats: JPEG, PNG, WebP
              </p>
            </div>

            {/* Description Field */}
            <div>
              <Label className="text-sm text-black">Description</Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter organization description"
                className="border-white/20 bg-white/10 text-black placeholder:text-gray-400"
                required
              />
              {error.description && (
                <p className="mt-1 text-sm text-red-500">{error.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleOrganizationSubmit}
              disabled={isLoading}
              variant="outline"
              className="mt-6 w-full bg-black font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Organization"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
