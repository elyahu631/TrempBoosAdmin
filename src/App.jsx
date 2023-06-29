import { useEffect } from 'react';
import Main from "./Components/Main";
import LoginProvider from './Contexts/LoginContext';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#226e7f89';
  }, []);

  return (
   <LoginProvider>
      <Main/>
    </LoginProvider>
  );
}

export default App;
