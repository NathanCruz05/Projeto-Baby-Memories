import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const salvarDados = (tabela: string, data: any) => {
    return addDoc(collection(db, tabela), data);
}


export { salvarDados };
