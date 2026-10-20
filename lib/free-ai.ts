import { removeBackground } from '@imgly/background-removal';

export async function freeRemoveBg(imageFile: File | Blob | string) {
  const blob = await removeBackground(imageFile as any);
  const url = URL.createObjectURL(blob);
  return url;
}
