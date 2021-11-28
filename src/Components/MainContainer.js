import Header from './Header.js';

const MainContainer = ({ content }) => {
  return (
      <div className="App">
        <div className="px-10 lg:px-60 xl:px-80 bg-green-300">
          <Header text='Cognichar - 認知特性テスト'/>
        </div>

        <section className="px-10 lg:px-60 xl:px-80 mt-10">
          {content}
        </section>
      </div>
  )
}

export default MainContainer;
