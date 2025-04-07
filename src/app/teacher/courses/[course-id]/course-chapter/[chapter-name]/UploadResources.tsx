
export default function UploadResources() {
  
    return (
        <div className="p-4">
            <div className="mt-6 space-y-6">
                {['File', 'Video', 'Thumbnail'].map((type) => (
                    <div key={type} className="border p-6 rounded-xl bg-gray-50">
                        <p className="font-semibold">Upload {type}</p>
                        <div className="mt-4 border-2 border-dashed border-gray-300 p-6 flex flex-col items-center rounded-lg">
                            <span className="text-gray-500">📂</span>
                            <p className="text-gray-600">Drag and drop files, or <span className="text-blue-500 cursor-pointer">Browse</span></p>
                            <p className="text-xs text-gray-400 mt-1">
                                {type === 'File' && "Upload files in Text, Word, PDF. (largest: 15M)"}
                                {type === 'Video' && "Upload files in .mp4, .mov. (largest: 1G)"}
                                {type === 'Thumbnail' && "Upload Thumbnail in JPEG, PNG. (largest: 15M)"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}