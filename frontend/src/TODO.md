# TODOs
make fa08.dbf instead of taxes.edn

## validation
v in reducer:
    + behaviour based on validation
v in state:
    + like validaJS: useValidatedForm with state
        handles change events too
    + like https://upmostly.com/tutorials/form-validation-using-custom-react-hooks:
    const Form = () => {
        const {
            values,
            handleChange,
            handleSubmit,
        } = useForm(login, validate);
        ...