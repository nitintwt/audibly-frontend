import React, { useState, useSyncExternalStore } from 'react';
import pdfToText from 'react-pdftotext';
import { FileText, Upload, Headphones, Sparkles, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import axios from 'axios';
import { toast , Toaster } from 'sonner';

function App() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false)
  const [audioSrc , setAudioSrc] = useState()

  setInterval(()=>{
    toast.error("under development")
  }, 1000)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (file) {
      setIsUploading(true);
      try {
        const text = await pdfToText(file)
        const response = await axios.post(`${import.meta.env.VITE_AUDIBLY_BACKEND}/api/v1/user/podcast` , {text}, {responseType:"blob"})
        console.log("response" , response)
        const url = URL.createObjectURL(new Blob([response.data], {type:"audio/mp3"}))
        setAudioSrc(url)
        setIsUploading(false)
        setFile(null)
      } catch (error) {
        setFile(null)
        setIsUploading(false)
        console.log("Something went wrong while generating Podcast")
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Headphones className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Audibly</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your PDFs into Engaging Podcasts
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Convert any PDF document into natural-sounding audio content. Perfect for learning, accessibility, and content repurposing.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            {audioSrc ? (
              <div className="space-y-6">
                <div className="p-6 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Your Podcast is Ready!</h3>
                  <div className="max-w-md mx-auto">
                    <audio 
                      controls 
                      className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                    >
                      <source src={audioSrc} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
                <a 
                  href={audioSrc} 
                  download="podcast.mp3"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 gap-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Podcast</span>
                </a>
                <button
                  onClick={() => setAudioSrc(null)}
                  className="block w-full mt-4 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Convert Another PDF
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-purple-600 mb-4" />
                    <span className="text-lg font-medium text-gray-700">
                      {file ? file.name : 'Drop your PDF here or click to upload'}
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!file || isUploading}
                  className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
                    file && !isUploading
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Convert to Podcast</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Text Processing</h3>
              <p className="text-gray-600">Advanced AI that understands document structure and context</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Headphones className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Natural Voice</h3>
              <p className="text-gray-600">Human-like voice synthesis with proper pacing and intonation</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <CheckCircle2 className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Conversion</h3>
              <p className="text-gray-600">Get your audio file in minutes, not hours</p>
            </div>
          </div>
        </div>
      </main>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;