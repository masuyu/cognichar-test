const HeaderWrapper = ({MarginPaddingString, color, children}) => {
  const classNameString = MarginPaddingString + ' ' + color

  return (
    <div className={classNameString}>
      {children}
    </div>
  )
}

export default HeaderWrapper