"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultValue?: string;
}

export function ImageUpload({ onUpload, defaultValue }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const client = supabase;
    if (!client) {
      toast.error("Storage service not configured. Please check your environment variables.");
      return;
    }

    try {
      setUploading(true);
      
      // 1. Create a unique file name
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      // 2. Upload to Supabase 'item-photos' bucket
      const { error: uploadError } = await client.storage
        .from("item-photos")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get public URL
      const { data: { publicUrl } } = client.storage
        .from("item-photos")
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div 
        onClick={() => !preview && fileInputRef.current?.click()}
        className={`relative aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-slate-900/40 ${
          preview 
            ? "border-emerald-500/50" 
            : "border-border/40 hover:border-emerald-500/40 cursor-pointer"
        }`}
      >
        {preview ? (
          <>
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button 
                type="button" 
                variant="destructive" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Remove
              </Button>
            </div>
          </>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">Uploading to Supabase...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground p-6 text-center">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <ImagePlus className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Click to upload photo</p>
              <p className="text-xs">PNG, JPG or WEBP (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {preview && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="h-3 w-3" /> Photo attached successfully
        </div>
      )}
    </div>
  );
}
