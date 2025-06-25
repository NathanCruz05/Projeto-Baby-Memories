import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImagem(uri: string) {
  const blob = await (await fetch(uri)).blob();
  const nome = `momentos/${Date.now()}.jpg`;
  const caminho = ref(storage, nome);
  await uploadBytes(caminho, blob);
  const url = await getDownloadURL(caminho);
  return url;
}
