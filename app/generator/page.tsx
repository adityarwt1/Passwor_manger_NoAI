"use client"
import { Copy, CopyCheck } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allowedChars = "";
    let password = "";

    allowedChars += lowercase ? lowercaseChars : "";
    allowedChars += uppercase ? uppercaseChars : "";
    allowedChars += numbers ? numberChars : '';
    allowedChars += symbols ? symbolChars : "";

    if (length <= 0) {
      return 'Length should be at least 1 character';
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
    if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    const charTypes = [lowercase, uppercase, numbers, symbols].filter(Boolean).length;
    score += charTypes * 2;

    if (score >= 8) return "Strong";
    if (score >= 5) return "Medium";
    return "Weak";
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setGeneratedPassword(password);
    setStrength(calculateStrength());
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            className="flex-1 bg-transparent outline-none font-mono text-gray-700"
            placeholder="Your generated password"
          />
          <button
            onClick={handleCopy}
            disabled={!generatedPassword}
            className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50"
            aria-label="Copy password"
          >
            {copied ? <CopyCheck size={20} /> : <Copy size={20} />}
          </button>
        </div>

        {generatedPassword && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Password Strength: <span className="font-medium">{strength}</span>
            </div>
            <div className="text-sm text-gray-600">
              Length: <span className="font-medium">{length}</span>
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-gray-700">Password Length</label>
            <span className="font-medium">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <label className="block text-gray-700 mb-2">Character Types</label>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() => setUppercase(!uppercase)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Uppercase Letters</span>
            </label>
            <span className="text-xs text-gray-500">(A-Z)</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() => setLowercase(!lowercase)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Lowercase Letters</span>
            </label>
            <span className="text-xs text-gray-500">(a-z)</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Numbers</span>
            </label>
            <span className="text-xs text-gray-500">(0-9)</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={symbols}
                onChange={() => setSymbols(!symbols)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Symbols</span>
            </label>
            <span className="text-xs text-gray-500">(!@#$%)</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGeneratePassword}
          disabled={!uppercase && !lowercase && !numbers && !symbols}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default Page;