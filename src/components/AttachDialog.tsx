'use client'

import { useState, useRef, DragEvent, ChangeEvent, MouseEvent } from 'react'
import { FaPaperclip, FaTimes, FaFile } from 'react-icons/fa'

type FileItem = {
  name: string
  type: 'pdf' | 'text' | 'image'
}

interface AttachDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

const AttachDialog: React.FC<AttachDialogProps> = ({ isOpen, onClose, onSelect }) => {
  const [recentFiles, setRecentFiles] = useState<FileItem[]>([
    { name: 'slot_01.pdf', type: 'pdf' },
    { name: 'slot_01.pdf', type: 'pdf' },
    { name: 'slot_09_10_hadoop-hdfs.txt', type: 'text' },
    { name: 'slot_03.pdf', type: 'pdf' },
    { name: 'slot_02.pdf', type: 'pdf' },
    { name: 'slot_00.pdf', type: 'pdf' },
    { name: 'image.png', type: 'image' },
    { name: '174358123371244113.png', type: 'image' },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      console.log('Tệp đã chọn:', files)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files) {
      console.log('Tệp đã thả:', files)
    }
  }

  const handleImageClick = (file: FileItem) => {
    const fakeUrl = `/uploads/${file.name}` // Bạn có thể thay bằng url thực nếu có
    onSelect(fakeUrl)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg w-10/12 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">Attach</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>

        {/* Upload zone */}
        <div
          className="border-2 border-dashed border-gray-600 p-4 rounded-lg mb-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <FaPaperclip className="text-white text-2xl" />
            </div>
            <p className="text-white mt-2">Upload files</p>
            <p className="text-gray-400">Drag and drop to upload</p>
            <button
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              onClick={() => fileInputRef.current?.click()}
            >
              Select files
            </button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {/* Recent files */}
        <div className="mb-4">
          <h3 className="text-white mb-2">Recent Files</h3>
          <div className="grid grid-cols-3 gap-4">
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="p-2 flex items-center justify-between bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                onClick={() => file.type === 'image' && handleImageClick(file)}
              >
                {file.type === 'image' ? (
                  <div className="w-8 h-8 bg-gray-600 rounded"></div>
                ) : (
                  <FaFile className="text-white" />
                )}
                <span className="text-white flex-1 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>
                <button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    setRecentFiles(recentFiles.filter((_, i) => i !== index))
                  }}
                  className="text-white hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Attach URL */}
        <div>
          <h3 className="text-white mb-2">Attach URL</h3>
          <input
            type="text"
            placeholder="Enter a publicly accessible URL"
            className="w-full p-2 bg-gray-700 text-white rounded mb-2 placeholder-gray-400"
          />
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
            Attach
          </button>
        </div>
      </div>
    </div>
  )
}

export default AttachDialog
