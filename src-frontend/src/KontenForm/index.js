import React, { useEffect, useState } from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'
import { Redirect, useParams } from 'react-router-dom'
import useKey from 'use-key-hook'

import { Padding, StatusHeader } from '../UIComponents'
import LabeledInput from '../Common/LabeledInput'
import { EditFormKeyboardControls } from '../KeyboardControls'
import useUrlForRead, { useAccountPlanAttributes } from '../useUrlForRead'

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`
const Wrapper = styled.div``

const mapTypeToInputType = type => {
  switch (type) {
    case '\\C':
      return 'text'
    case '\\N':
      return 'number'
    case '\\D':
      return 'date'
    case '\\L':
      return 'checkbox'
    default:
      return 'text'
  }
}

const escUrl = '/accounts'

function KontenRecordForm() {
  const [redirect, setRedirect] = useState()

  const {
    result: attsRaw,
    loading: loadingAtts,
    error: attsErrorerd,
  } = useAccountPlanAttributes()
  const atts = (attsRaw || []).map(a => {
    return { ...a, name: a.name.toLowerCase() }
  })

  const { accountNo } = useParams()
  const { result: accountValues } = useUrlForRead(
    '/account?accountNo=' + accountNo
  )
  const { handleSubmit, register, errors, reset } = useForm({
    defaultValues: accountValues,
  })
  useEffect(() => reset(accountValues), [accountValues, reset])
  useKey(() => setRedirect(escUrl), { detectKeys: [27] });

  const onSubmit = e => {
    console.log('submitting...', e)
    e.preventDefault()
  }
  if (redirect) return <Redirect to={redirect} />
  else
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <StatusHeader>Konten</StatusHeader>
        <Padding>
          <Flex>
            {(atts || []).map((a, i) => (
              <Wrapper key={a.name}>
                <LabeledInput
                  autoFocus={i===0}
                  label={a.name}
                  name={a.name}
                  size={a.length}
                  type={mapTypeToInputType(a.type)}
                  ref={register({
                    validate: v => (v + '').length > a.length || 'wert zu lang',
                  })}
                  validationMsg={errors[a.name]}
                />
              </Wrapper>
            ))}
          </Flex>
        </Padding>
        <EditFormKeyboardControls cancel={() => setRedirect(escUrl)} />
      </form>
    )
}

export default KontenRecordForm
