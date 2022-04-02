import HeaderContent from '../../ui-elements/HeaderContent.js';
import HeaderWrapper from '../../ui-elements/HeaderWrapper.js';

const Header = () => {
  return (
    <HeaderWrapper MarginPaddingString="px-5 lg:px-36 xl:px-48 2xl:px-64" color="bg-green-300">
      <HeaderContent text='Cognichar - 認知特性テスト'/>
    </HeaderWrapper>
  );
}

export default Header;