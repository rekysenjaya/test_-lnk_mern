const Display = ({ data }) => {
  const string = data.join('')
  return <div className="calculator-display">{string}</div>
}

export default Display