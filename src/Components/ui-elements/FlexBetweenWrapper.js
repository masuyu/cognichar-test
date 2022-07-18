const FlexBetweenWrapper = ({justifyContentDirective, children}) => {
  const justifyContentStringList = {
    'start': 'justify-start',
    'end': 'justify-end',
    'center': 'justify-center',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  }

  const justifyContentString = justifyContentStringList.hasOwnProperty(justifyContentDirective)
    ? justifyContentStringList[justifyContentDirective]
    : justifyContentStringList['start']

  const style = "flex " + justifyContentString

  return (
    <div className={style}>
      {children}
    </div>
  )
}

export default FlexBetweenWrapper