import { Check, FileVideo, Upload, X } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import axiosInstance from "@/lib/axiosInstance";

const VideoUploader = ({ channelId, channelName }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoTags, setVideoTags] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("video/")) {
        toast.error("Please upload a valid video file");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        toast.error("Video file exceeds 100MB limit");
        return;
      }
      setVideoFile(file);
      const filename = file.name;
      if (!videoTitle) {
        setVideoTitle(filename);
      }
    }
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoTitle("");
    setIsUploading(false);
    setUploadComplete(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cancelUpload = () => {
    if (isUploading) {
      toast.error("Your video uploading has been cancelled");
    }
    resetForm();
  };

  const handleUpload = async () => {
    if (!videoFile || !videoTitle.trim()) {
      toast.error("Please provide file and title");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("videotitle", videoTitle);
    formData.append("videodesc", videoDesc);
    formData.append("videotags", videoTags);
    formData.append("videochannel", channelName);
    formData.append("uploader", channelId);
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const res = await axiosInstance.post("/video/upload", formData, {
        onUploadProgress: (progresEvent: any) => {
          const progress = Math.round(
            (progresEvent.loaded * 100) / progresEvent.total
          );
          setUploadProgress(progress);
        },
      });
      toast.success("Uploaded successfully");
      resetForm()
    } catch (error) {
      console.log("Error uploading video",error)
      toast.error("There was a error in uploading video. Please try again...")
    }finally{
      setIsUploading(false)
    }
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Upload a Video</h1>
      <div>
        {!videoFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:bg-gray-50 transition"
          >
            <Upload className="w-12 h-12 text-blue-500 mb-2" />
            <p className="text-lg font-semibold text-black mb-1">
              Drag and drop video file to upload
            </p>
            <p className="text-sm text-gray-500 mb-1">
              or click to select file
            </p>
            <p className="text-xs text-gray-400 mb-2">
              MP4, WebM, MOV, AVI (max 100MB)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              onChange={handleFileChange}
              className="hidden text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-gray-50 rounded p-4">
              <FileVideo className="w-10 h-10 text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {videoFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              {!isUploading && !uploadComplete && (
                <Button variant="ghost" size="icon" onClick={cancelUpload}>
                  <X className="w-5 h-5" />
                </Button>
              )}
              {uploadComplete && (
                <div className="flex items-center text-green-600">
                  <Check className="w-6 h-6 mr-1" /> Uploaded
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="title" className="block mb-1 text-black">
                Title *(required)
              </Label>
              <Input
                id="title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full text-black"
                disabled={isUploading}
              />
            </div>
            <div>
              <Label htmlFor="description" className="block mb-1 text-black">
                Description *(required)
              </Label>
              <Input
                id="description"
                value={videoDesc}
                onChange={(e) => setVideoDesc(e.target.value)}
                className="w-full text-black"
                disabled={isUploading}
                placeholder="Add a description describes your content"
              />
            </div>
            <div>
              <Label htmlFor="tags" className="block mb-1 text-black">
                Tags (Use commas "," separated to get high search results)
              </Label>
              <Input
                id="tags"
                value={videoTags}
                onChange={(e) => setVideoTags(e.target.value)}
                className="w-full text-black"
                placeholder="e.g. travel, vlog, adventure"
                disabled={isUploading}
              />
            </div>
            {isUploading && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Uploading...</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {uploadProgress}%
                  </span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
            <div className="flex gap-3">
              {!uploadComplete && (
                <>
                  <Button
                    variant="outline"
                    onClick={cancelUpload}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isUploading || !videoTitle.trim() || uploadComplete}
                    onClick={handleUpload}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
