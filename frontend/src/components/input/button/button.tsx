import './button.scss'

type ButtonProps = {
  type: 'primary' | 'secondary' | 'submit',
  text: string,
  handleClick(): void,
}

function Button({type, text, handleClick}: ButtonProps) {
  return (
    <button className={`c-button c-button__${type}`} onClick={handleClick}>{text}</button>
  )
}

export default Button