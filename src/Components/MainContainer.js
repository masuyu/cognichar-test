import Header from './Header.js';
import HeaderWrapper from './HeaderWrapper.js';

const MainContainer = ({ content }) => {
  return (
      <div className="App">
        <HeaderWrapper MarginPaddingString="px-10 lg:px-60 xl:px-80" color="bg-green-300">
          <Header text='Cognichar - 認知特性テスト'/>
        </HeaderWrapper>

        <section className="px-10 lg:px-60 xl:px-80 mt-10">
          {content}
        </section>
      </div>
  )
}

export default MainContainer;
