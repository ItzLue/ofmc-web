import { child, get, getDatabase, ref as dbref, set } from '@firebase/database'
import { IProtocol } from '@/types/protocol'


export const writeNewProtocol = async (protocol: IProtocol, userId?: string) => {
    const db = getDatabase()
    const dbRef = dbref(db)

    const startingCode = protocol.isTemplate ? await get(child(dbRef, `templates/${protocol.templateId}`)).then(
        (snapshot) => snapshot.val().startingCode
    ) : protocol.startingCode

    get(child(dbRef, `protocols/${protocol.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('Protocol already exists')
        } else {
            set(dbref(db, `protocols/${protocol.uid}`), {
                name: protocol.name,
                urlSlug: protocol.urlSlug,
                type: protocol.type,
                startingCode,
                userId,
                isComplete: protocol.isComplete ?? false,
            }).then(() => console.log('Protocol added'))
                .catch((e) => console.log(e))
        }
    })
}
export default writeNewProtocol
