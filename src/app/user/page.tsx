"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Edit3,
  Copy,
  CheckCircle,
  ExternalLink,
  Clock,
  Globe,
} from "lucide-react";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page or open modal
    console.log("Edit profile clicked");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Not signed in
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view your profile
            </p>
            <Link href="/auth">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Profile</h1>
            <p className="text-gray-600 text-lg">
              Manage your account information
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Picture Section */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-4">
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-lg object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Verification Badge */}
                {user.primaryEmailAddress?.verification?.status ===
                  "verified" && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                    <Shield className="w-4 h-4 mr-2" />
                    Verified Account
                  </div>
                )}
              </div>

              {/* User Info Section */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.fullName || `${user.firstName} ${user.lastName}`}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user.primaryEmailAddress?.emailAddress}</span>
                  </div>

                  {user.username && (
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>@{user.username}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Member since{" "}
                      {user.createdAt
                        ? formatDate(user.createdAt.toString())
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={handleEditProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/checkout/free-trial" className="block">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    Start Trial
                  </span>
                </div>
              </Link>

              <button
                onClick={handleEditProfile}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Edit3 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-700">
                  Edit Profile
                </span>
              </button>

              <button
                onClick={() => copyToClipboard(JSON.stringify(user, null, 2))}
                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Copy className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-700">
                  Copy Data
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-700">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
