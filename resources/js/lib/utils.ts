// import { type ClassValue, clsx } from "clsx"
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME as string;
const cloudApi = import.meta.env.VITE_CLOUDINARY_API as string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format: string | undefined
): string {
  return dayjs(date).format(format);
}

export async function mediaUploader(files: File[]) {
  const media = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'iablofcf');
    formData.append('cloud_name', cloudName);

    try {
      const res = await fetch(`${cloudApi}/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      media.push(data.secure_url);
    } catch (err) {
      console.log('Error while uploading:', err);
    }
  }
}

export  const calculateTimeDifference = (timestamp) => {
  const currentTime = new Date();
  const timestampTime = new Date(timestamp);

  const difference = currentTime.getTime() - timestampTime.getTime();
  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedHours = hours % 24;
  const formattedMinutes = minutes % 60;

  let formattedTimeDifference = '';
  if (days > 0) {
      formattedTimeDifference += `${days} d `;
  }
  if (formattedHours > 0) {
      formattedTimeDifference += `${formattedHours} h `;
  }
  formattedTimeDifference += `${formattedMinutes} min`;

  return formattedTimeDifference;
};