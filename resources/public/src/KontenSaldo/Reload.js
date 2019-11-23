import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

function Reload() {
    const { url, param } = useParams()
    return <Redirect to={'/' + url + '/' + param} />
}

export default Reload