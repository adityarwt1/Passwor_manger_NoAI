"use client"
import { Copy, CopyCheck, RefreshCw, Key } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useId, useState } from 'react'

interface UsenameUserId {
    username: string | null,
    userId: string | null,
}
const Add: React.FC<UsenameUserId> = ({ username, userId }) => {
    const router = useRouter()
    const [plateform, setPlateform] = useState("")
    const [password, setPassword] = useState("")
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showGenerator, setShowGenerator] = useState(false)
    const [generatorSettings, setGeneratorSettings] = useState({
        length: 12,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisableSubmit(true)
        try {
            const response = await fetch(`/api/add?username=${username}&userid=${userId}&plateform=${plateform}&password=${password}`, {
                method: "POST"
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.error("Submission error:", error)
            setDisableSubmit(false)
        }
    }

    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const numberChars = '0123456789'
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

        let allowedChars = ""
        let generatedPassword = ""

        allowedChars += generatorSettings.lowercase ? lowercaseChars : ""
        allowedChars += generatorSettings.uppercase ? uppercaseChars : ""
        allowedChars += generatorSettings.numbers ? numberChars : ''
        allowedChars += generatorSettings.symbols ? symbolChars : ""

        if (allowedChars.length === 0) {
            return "Select at least one character type"
        }

        for (let i = 0; i < generatorSettings.length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length)
            generatedPassword += allowedChars[randomIndex]
        }

        setPassword(generatedPassword)
    }

    const handleCopy = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    return (
        <div className="flex w-full min-h-screen justify-center items-center bg-black text-white px-4 py-8">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center mb-6">Add Password</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="platform" className="text-sm mb-1">Platform/Site Name</label>
                        <input
                            type="text"
                            name="platform"
                            id="platform"
                            placeholder="e.g. Google, Facebook"
                            className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                            onChange={(e) => setPlateform(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <button
                                type="button"
                                onClick={() => setShowGenerator(!showGenerator)}
                                className="flex items-center text-xs text-blue-400 hover:text-blue-300"
                            >
                                <Key className="w-4 h-4 mr-1" />
                                {showGenerator ? 'Hide Generator' : 'Generate Password'}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="password"
                                id="password"
                                value={password}
                                placeholder="Enter or generate password"
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {password && (
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="absolute right-2 top-2 text-zinc-400 hover:text-white"
                                    title="Copy password"
                                >
                                    {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
                                </button>
                            )}
                        </div>
                    </div>

                    {showGenerator && (
                        <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 mt-2">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium">Password Generator</h3>
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="flex items-center text-sm bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded"
                                >
                                    <RefreshCw className="w-4 h-4 mr-1" />
                                    Generate
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm mb-1">Length: {generatorSettings.length}</label>
                                    <input
                                        type="range"
                                        min="6"
                                        max="32"
                                        value={generatorSettings.length}
                                        onChange={(e) => setGeneratorSettings({
                                            ...generatorSettings,
                                            length: parseInt(e.target.value)
                                        })}
                                        className="w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={generatorSettings.uppercase}
                                            onChange={(e) => setGeneratorSettings({
                                                ...generatorSettings,
                                                uppercase: e.target.checked
                                            })}
                                            className="h-4 w-4"
                                        />
                                        <span>Uppercase (A-Z)</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={generatorSettings.lowercase}
                                            onChange={(e) => setGeneratorSettings({
                                                ...generatorSettings,
                                                lowercase: e.target.checked
                                            })}
                                            className="h-4 w-4"
                                        />
                                        <span>Lowercase (a-z)</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={generatorSettings.numbers}
                                            onChange={(e) => setGeneratorSettings({
                                                ...generatorSettings,
                                                numbers: e.target.checked
                                            })}
                                            className="h-4 w-4"
                                        />
                                        <span>Numbers (0-9)</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={generatorSettings.symbols}
                                            onChange={(e) => setGeneratorSettings({
                                                ...generatorSettings,
                                                symbols: e.target.checked
                                            })}
                                            className="h-4 w-4"
                                        />
                                        <span>Symbols (!@#)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full py-2 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition flex justify-center items-center"
                        disabled={disableSubmit}
                    >
                        {disableSubmit ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {disableSubmit ? 'Adding...' : 'Add Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add;