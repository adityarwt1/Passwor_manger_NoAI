"use client";

import {
  Copy,
  CopyCheck,
  RefreshCw,
  Key,
  Eye,
  EyeOff,
  Globe,
  User,
  Save,
  Settings,
  Check,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UsenameUserId {
  username: string | null;
  userId: string | null;
}

const Add: React.FC<UsenameUserId> = ({ username, userId }) => {
  const router = useRouter();
  const [plateform, setPlateform] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatorSettings, setGeneratorSettings] = useState({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSubmit(true);
    try {
      const response = await fetch(
        `/api/add?username=${username}&userid=${userId}&plateform=${plateform}&password=${password}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setDisableSubmit(false);
    }
  };

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let allowedChars = "";
    allowedChars += generatorSettings.lowercase ? lowercaseChars : "";
    allowedChars += generatorSettings.uppercase ? uppercaseChars : "";
    allowedChars += generatorSettings.numbers ? numberChars : "";
    allowedChars += generatorSettings.symbols ? symbolChars : "";

    if (allowedChars.length === 0) {
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < generatorSettings.length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      generatedPassword += allowedChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 6)
      return { strength: "weak", color: "bg-red-500", text: "Weak" };
    if (pwd.length < 10)
      return { strength: "medium", color: "bg-yellow-500", text: "Medium" };
    if (pwd.length >= 12)
      return { strength: "strong", color: "bg-green-500", text: "Strong" };
    return { strength: "medium", color: "bg-yellow-500", text: "Medium" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Platform Field */}
        <div className="space-y-2">
          <label
            htmlFor="platform"
            className="block text-sm font-semibold text-slate-900"
          >
            Platform/Site Name *
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="platform"
              id="platform"
              placeholder="e.g., Gmail, Facebook, GitHub"
              value={plateform}
              onChange={(e) => setPlateform(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-500"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-900"
            >
              Password *
            </label>
            <button
              type="button"
              onClick={() => setShowGenerator(!showGenerator)}
              className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <Key className="w-4 h-4" />
              <span>
                {showGenerator ? "Hide Generator" : "Generate Password"}
              </span>
            </button>
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Enter or generate a strong password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-20 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-500"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {password && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  title="Copy password"
                >
                  {copied ? (
                    <CopyCheck className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="flex items-center space-x-3 mt-2">
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{
                    width:
                      password.length < 6
                        ? "33%"
                        : password.length < 10
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  passwordStrength.strength === "weak"
                    ? "text-red-600"
                    : passwordStrength.strength === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {passwordStrength.text}
              </span>
            </div>
          )}
        </div>

        {/* Password Generator */}
        {showGenerator && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-900">
                  Password Generator
                </h3>
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate</span>
              </button>
            </div>

            {/* Length Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">
                  Password Length
                </label>
                <span className="text-sm font-semibold text-slate-900 bg-white px-2 py-1 rounded border">
                  {generatorSettings.length}
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="32"
                value={generatorSettings.length}
                onChange={(e) =>
                  setGeneratorSettings({
                    ...generatorSettings,
                    length: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>6</span>
                <span>32</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">
                Include Characters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: "uppercase",
                    label: "Uppercase Letters (A-Z)",
                    example: "ABC",
                  },
                  {
                    key: "lowercase",
                    label: "Lowercase Letters (a-z)",
                    example: "abc",
                  },
                  { key: "numbers", label: "Numbers (0-9)", example: "123" },
                  { key: "symbols", label: "Symbols (!@#)", example: "!@#" },
                ].map(({ key, label, example }) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={
                          generatorSettings[
                            key as keyof typeof generatorSettings
                          ] as boolean
                        }
                        onChange={(e) =>
                          setGeneratorSettings({
                            ...generatorSettings,
                            [key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-slate-900 bg-white border-slate-300 rounded focus:ring-slate-900 focus:ring-2"
                      />
                      {generatorSettings[
                        key as keyof typeof generatorSettings
                      ] && (
                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5 pointer-events-none" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {label}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {example}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={disableSubmit}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {disableSubmit ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Adding Password...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Add Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
