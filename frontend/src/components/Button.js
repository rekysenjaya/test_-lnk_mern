const Button = ({ onClick, size, value, label }) => {
  return (
    <div
      onClick={onClick}
      className="calculator-button"
      data-size={size}
      data-value={value}
    >
      {label}
    </div>
  )
}

export default Button