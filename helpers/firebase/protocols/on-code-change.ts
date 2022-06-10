import { child, getDatabase, ref, update } from '@firebase/database'

const onCodeChange = (value: string, protocolId: string) => {
    const db = getDatabase()
    const dbRef = ref(db)

    update(child(dbRef, `protocols/${protocolId}`), {
        userCode: value,
    }).then(() => console.log('updated by user'))
}

export default onCodeChange
