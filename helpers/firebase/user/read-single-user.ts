import { getDatabase, ref, child, get } from "firebase/database";
import { User } from '@firebase/auth'


export const readSingleUser = (userId: string) => {
    const db = getDatabase()
    const dbRef = ref(db)
    return get(child(dbRef, `users/${userId}`)).then((snapshot) => snapshot.val() as User)
}
