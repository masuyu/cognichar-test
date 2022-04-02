import Header from "./ui-parts/Header/index.js";

const MainContainer = ({children}) => {
  return (
      <div className="App">
        <Header />

        <section className="px-5 lg:px-36 xl:px-48 2xl:px-64 mt-8">
          {children}
        </section>
      </div>
  )
}

export default MainContainer;
