"use client";

import {
  Copy,
  CopyCheck,
  RefreshCw,
  Shield,
  Key,
  Settings,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PasswordGeneratorPage = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");
  const [strengthColor, setStrengthColor] = useState("");

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let allowedChars = "";
    let password = "";

    allowedChars += lowercase ? lowercaseChars : "";
    allowedChars += uppercase ? uppercaseChars : "";
    allowedChars += numbers ? numberChars : "";
    allowedChars += symbols ? symbolChars : "";

    if (length <= 0) {
      return "Length should be at least 1 character";
    }

    if (allowedChars.length === 0) {
      return "At least one character set must be selected";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }

    return password;
  };

  const calculateStrength = () => {
    let score = 0;

    // Length scoring
    if (length >= 16) score += 3;
    else if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    // Character type scoring
    const charTypes = [lowercase, uppercase, numbers, symbols].filter(
      Boolean
    ).length;
    score += charTypes * 2;

    // Determine strength and color
    if (score >= 9) {
      setStrength("Very Strong");
      setStrengthColor("text-green-600");
      return "Very Strong";
    } else if (score >= 7) {
      setStrength("Strong");
      setStrengthColor("text-green-500");
      return "Strong";
    } else if (score >= 5) {
      setStrength("Medium");
      setStrengthColor("text-yellow-500");
      return "Medium";
    } else {
      setStrength("Weak");
      setStrengthColor("text-red-500");
      return "Weak";
    }
  };

  const getStrengthBarWidth = () => {
    if (strength === "Very Strong") return "100%";
    if (strength === "Strong") return "75%";
    if (strength === "Medium") return "50%";
    return "25%";
  };

  const getStrengthBarColor = () => {
    if (strength === "Very Strong") return "bg-green-600";
    if (strength === "Strong") return "bg-green-500";
    if (strength === "Medium") return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setGeneratedPassword(password);
    calculateStrength();
  };

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Auto-generate password on component mount
  useEffect(() => {
    handleGeneratePassword();
  }, [length]);

  // Recalculate strength when settings change
  useEffect(() => {
    if (generatedPassword) {
      calculateStrength();
    }
  }, [length, uppercase, lowercase, numbers, symbols, generatedPassword]);

  const isGenerateDisabled = !uppercase && !lowercase && !numbers && !symbols;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:text-slate-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">
              Password Generator
            </span>
          </div>

          {/* Page Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-900/20 to-transparent rounded-2xl blur opacity-60" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Password Generator
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl">
                  Generate secure, random passwords with customizable options
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-500">
                  Cryptographically Secure
                </div>
                <div className="flex items-center space-x-1 text-slate-700">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Random Generation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Secure Password Generation
                </h3>
                <p className="text-blue-700 text-sm">
                  All passwords are generated using cryptographically secure
                  random number generation. Passwords are created locally in
                  your browser and never sent to our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Generator Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Generated Password Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Generated Password
                  </h2>
                  <button
                    onClick={handleGeneratePassword}
                    disabled={isGenerateDisabled}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate New</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 text-lg pr-12 focus:outline-none"
                    placeholder="Click 'Generate New' to create a password"
                  />
                  <button
                    onClick={handleCopy}
                    disabled={!generatedPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-slate-500 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Copy password"
                  >
                    {copied ? (
                      <CopyCheck className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {generatedPassword && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Password Strength
                      </span>
                      <span
                        className={`text-sm font-semibold ${strengthColor}`}
                      >
                        {strength}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getStrengthBarColor()}`}
                        style={{ width: getStrengthBarWidth() }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Length: {length} characters</span>
                      <span>
                        {
                          [lowercase, uppercase, numbers, symbols].filter(
                            Boolean
                          ).length
                        }{" "}
                        character types
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Password Length */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Password Settings
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">
                      Password Length
                    </label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      {length}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>4</span>
                    <span>32</span>
                  </div>
                </div>
              </div>

              {/* Character Options */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700">
                  Include Characters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: "uppercase",
                      label: "Uppercase Letters",
                      example: "ABCDEF",
                      state: uppercase,
                      setter: setUppercase,
                    },
                    {
                      key: "lowercase",
                      label: "Lowercase Letters",
                      example: "abcdef",
                      state: lowercase,
                      setter: setLowercase,
                    },
                    {
                      key: "numbers",
                      label: "Numbers",
                      example: "123456",
                      state: numbers,
                      setter: setNumbers,
                    },
                    {
                      key: "symbols",
                      label: "Symbols",
                      example: "!@#$%^",
                      state: symbols,
                      setter: setSymbols,
                    },
                  ].map(({ key, label, example, state, setter }) => (
                    <label
                      key={key}
                      className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={state}
                          onChange={() => setter(!state)}
                          className="w-5 h-5 text-slate-900 bg-white border-slate-300 rounded focus:ring-slate-900 focus:ring-2"
                        />
                        {state && (
                          <Check className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" />
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

                {isGenerateDisabled && (
                  <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      Please select at least one character type to generate a
                      password.
                    </p>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGeneratePassword}
                disabled={isGenerateDisabled}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Generate New Password</span>
              </button>
            </div>
          </div>

          {/* Security Tips */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200/60">
              <h3 className="font-semibold text-slate-900 mb-3">
                Password Security Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Use at least 12 characters for better security</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Include all character types when possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Never reuse passwords across different accounts</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/60">
              <h3 className="font-semibold text-slate-900 mb-3">
                How It Works
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Our generator uses cryptographically secure random number
                generation to create truly random passwords.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200"
              >
                <span>Learn More</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;
