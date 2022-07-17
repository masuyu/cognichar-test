const FlexBetweenWrapper = ({justifyContentDirective, children}) => {
  const flexClassString = "flex justify-" + justifyContentDirective

  return (
    <div className={flexClassString}>
      {children}
    </div>
  )
}

export default FlexBetweenWrapper