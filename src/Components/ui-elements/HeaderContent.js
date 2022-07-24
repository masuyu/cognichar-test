const HeaderContent = ({ text }) => {

  return (
    <section className='py-4'>
      <p className='text-2xl text-white'>
        <a class="cursor-pointer" href="/">{text}</a>
      </p>
    </section>
  )
}

export default HeaderContent;
