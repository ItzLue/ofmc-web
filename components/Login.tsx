import React, { useState } from 'react'
import { EAPICallstate } from '../types/api'

const Login = () => {
    const [APIcallState, setAPICallState] = useState<EAPICallstate>(EAPICallstate.READY);

    return (
        <div>

        </div>
    )
}

export default Login
