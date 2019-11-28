import { useState } from 'react'
import useKey from 'use-key-hook'

function useEditableRecord() {
    const [recordTemplate, setRecordTemplate] = useState()
    const selectMode = recordTemplate === undefined
    const editMode = !selectMode

    const cancel = () => setRecordTemplate(undefined)
    useKey(() => cancel(), { detectKeys: [27] });

    return { recordTemplate, setRecordTemplate, selectMode, editMode }
}

export default useEditableRecord