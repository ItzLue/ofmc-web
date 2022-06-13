import { child, get, getDatabase, ref as dbref, set } from '@firebase/database'
import { IProtocol } from '../../../types/protocol'
import slugify from 'slugify'
import { getDownloadURL, getStorage, listAll, ref as srref } from '@firebase/storage'
import { EProtocolType } from '@/pages/api/templates'
import { User } from '@firebase/auth'

/*
export const readAllProtocols = async (): Promise<IProtocol[]> => {
    const storage = getStorage()

    const protocols: IProtocol[] = []
    const listRef = srref(storage, 'public-protocols')

    await listAll(listRef)
        .then((res) => {
                res.prefixes.map((folderRef) => {
                    listAll(folderRef).then((res) => {
                        res.items.map(async (item, i) => {
                                const protocol: IProtocol = {

                                    isComplete: false,
                                    name: item.name,
                                    type: EProtocolType.CLASSIC,
                                    urlSlug: slugify(item.name.split('.')[0]),
                                    downloadUrl: 'await getDownloadURL(item).then((url) => url)',
                                }
                                protocols.push(protocol)
                            },
                        )
                    })
                })
            },
        ).catch((error) => {
            console.error(error)
        })
    return protocols
}
 */

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
