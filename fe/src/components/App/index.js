import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from '../../assets/style/global';
import defaultTheme from '../../assets/style/default';

import Routes from '../../Routes';
import { Container } from './style';
import Header from '../Header';
// import ContactsList from '../ContactsList';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
