import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './screens/Home';
import {Routes,Route} from 'react-router-dom'
import Login from './screens/Login';
import SignUp from "./screens/SignUp"
import Cart from './screens/Cart';
import MyOrder from './screens/MyOrder';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

