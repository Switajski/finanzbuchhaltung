import styled from 'styled-components'
import LabeledInput from './LabeledInput'

const EmphasizableInput = styled(LabeledInput)`
${props => props.emphasize && 'background-color:' + props.theme.emphasize + ';'}`

export default EmphasizableInput