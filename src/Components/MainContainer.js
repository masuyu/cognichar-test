import Header from './Header.js';
import HeaderWrapper from './HeaderWrapper.js';

const MainContainer = ({ content }) => {
  return (
      <div className="App">
        <HeaderWrapper MarginPaddingString="px-5 lg:px-36 xl:px-48 2xl:px-64" color="bg-green-300">
          <Header text='Cognichar - 認知特性テスト'/>
        </HeaderWrapper>

        <section className="px-5 lg:px-36 xl:px-48 2xl:px-64 mt-8">
          {content}
        </section>
      </div>
  )
}

export default MainContainer;
