"use client"

import React, { useRef } from "react"

interface FeatureImageUploaderProps {
    onImageUpload: (url: string) => void
}

export const FeatureImageUploader: React.FC<FeatureImageUploaderProps> = ({
                                                                              onImageUpload,
                                                                          }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    const handleFile = (file: File) => {
        // ✅ Option A: convert to base64 URL for preview only
        const reader = new FileReader()
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
                onImageUpload(reader.result)
            }
        }
        reader.readAsDataURL(file)

        // ✅ Option B: to integrate with backend, send `file` to /api/upload
        // const formData = new FormData()
        // formData.append("file", file)
        // axios.post("/api/upload", formData).then(res => onImageUpload(res.data.url))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <p className="text-gray-500">Click or drag image here to upload</p>
        </div>
    )
}
