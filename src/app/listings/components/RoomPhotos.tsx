"use client";

import Image from "next/image";

interface RoomPhotosProps {
  photos?: string[] | string; // Handle string case too
}

export default function RoomPhotos({ photos }: RoomPhotosProps) {
  // Ensure `photos` is converted to an array if it's a string
  const photoArray: string[] = Array.isArray(photos) 
    ? photos 
    : typeof photos === "string"
      ? JSON.parse(photos)
      : [];

  // Handle cases with no images
  if (!photoArray.length) {
    return (
      <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
        No Images Available
      </div>
    );
  }

  // Display a grid of room images
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
      {photoArray.map((photo, index) => (
        <div key={index} className="relative w-full h-60 rounded-md overflow-hidden shadow-md">
          <Image 
            src={photo}
            alt={`Room photo ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
