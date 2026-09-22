import './textfield.scss'

type TextfieldProps = {
  value: string,
  setValue(value: string): void,
  label?: string
}

function Textfield({value, setValue, label=''}: TextfieldProps) {

  const handleFocusIn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.parentElement?.getElementsByClassName('c-textfield__label-row')[0].classList.add('floating')
    e.target.parentElement?.classList.add('focus-in')
  }

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value) {
      e.target.parentElement?.getElementsByClassName('c-textfield__label-row')[0].classList.remove('floating')
    }
    e.target.parentElement?.classList.remove('focus-in');
  }

  return (
    <div className='c-textfield'>
      {label != '' && (
        <div className='c-textfield__label-row'>
          <div className='c-textfield__label--leading'></div>
          <div className='c-textfield__label--center'>
            <label className='c-textfield c-textfield__label'>{label}</label>
          </div>
          <div className='c-textfield__label--trailing'></div>
        </div>
      )}
      <input type='text' className='c-textfield c-textfield__input' 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        onFocus={(e) => handleFocusIn(e)}
        onBlur={(e) => handleFocusOut(e)} />
    </div>
  )
}

export default Textfield
