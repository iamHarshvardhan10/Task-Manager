import { app } from '../firebase.config'
import { getDocs, query, collection, orderBy, where} from 'firebase/firestore'


export const getAllTask = async (firestoreDb, userId) => {

    const tasks = await getDocs(
        query(collection(firestoreDb, 'taskDet'), where('userId', "==", userId), orderBy("id", "desc"))
    );

    return tasks.docs.map((doc) => doc.data());
}




