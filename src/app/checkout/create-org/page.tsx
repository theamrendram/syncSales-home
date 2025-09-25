"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type OrganizationFormData = {
  organizationName: string;
  organizationLogo: File | null;
  description: string;
};

type OrganizationFormErrors = Partial<
  Record<keyof OrganizationFormData, string | null>
>;

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: "",
    organizationLogo: null,
    description: "",
  });
  const [formErrors, setFormErrors] = useState<OrganizationFormErrors>({});

  const validateForm = (): OrganizationFormErrors => {
    const errors: OrganizationFormErrors = {};

    if (!formData.organizationName.trim()) {
      errors.organizationName = "Organization name is required";
    }

    if (!formData.organizationLogo) {
      errors.organizationLogo = "Organization logo is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const validateFile = (file: File | null | undefined) => {
    if (!file) return "Organization logo is required";

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, or WebP)";
    }

    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof OrganizationFormData;
    const { value, files } = target;

    setFormData((prev) => {
      if (name === "organizationLogo") {
        return {
          ...prev,
          organizationLogo: files && files.length > 0 ? files[0] : null,
        };
      }
      return {
        ...prev,
        [name]: value,
      } as OrganizationFormData;
    });

    // Clear errors and messages when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
    setError(null);
    setSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    const fileError = validateFile(file);

    if (fileError) {
      setError(fileError);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      organizationLogo: file,
    }));

    setFormErrors((prev) => ({
      ...prev,
      organizationLogo: null,
    }));
    setError(null);
    setSuccess(false);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("organizationName", formData.organizationName);
      submitData.append("description", formData.description);
      if (formData.organizationLogo) {
        submitData.append("organizationLogo", formData.organizationLogo);
      }

      // Simulate API call (replace with your actual API endpoint)
      const response = await fetch("/api/org", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create organization: ${response.statusText}`,
        );
      }

      setSuccess(true);

      // Reset form
      setFormData({
        organizationName: "",
        organizationLogo: null,
        description: "",
      });
      setFormErrors({});

      // Clear file input
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred while creating the organization";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-black">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Your Organization
        </h1>

        {/* Success Message */}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-green-800">Organization created successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Organization Name Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              placeholder="Enter organization name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.organizationName && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.organizationName}
              </p>
            )}
          </div>

          {/* Organization Logo Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Organization Logo
            </label>
            <input
              type="file"
              name="organizationLogo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-sm file:font-semibold file:text-black hover:file:bg-black/30 focus:outline-none focus:ring-2"
            />
            {formErrors.organizationLogo && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.organizationLogo}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Max file size: 5MB. Supported formats: JPEG, PNG, WebP
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter organization description"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.description && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.description}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
