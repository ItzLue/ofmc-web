import { child, get, getDatabase, ref, set } from '@firebase/database'
import { User } from '@firebase/auth'


const writeNewUser = (user: User) => {
    const db = getDatabase()
    const dbRef = ref(db)
    get(child(dbRef, `users/${user.uid}`)).then(snapshot => {
        if (snapshot.exists()) {
            console.log('User already exists')
        } else {
            set(ref(db, 'users/' + user.uid), {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }).then(() => console.log('user added'))
                .catch((e) => console.log(e))
        }
    })
}

export default writeNewUser
