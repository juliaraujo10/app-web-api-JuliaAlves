import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NewBook from './pages/NewBook';
import Book from './pages/Book'
import NavBar from './components/NavBar/NavBar';
import BookEdit from './pages/BookEdit';

import Container from './components/Container/Container';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

        <Container>

          <Routes>

            <Route path='/' element={<NavBar/>}>

              <Route index  element={<Home/>}/>

              <Route  path='book' element={<Book/>}/>

              <Route  path='newbook' element={<NewBook/>}/>

              <Route path='bookEdit/:id' element={<BookEdit/>}/>

            </Route>

          </Routes>

        </Container>

      </BrowserRouter>

    </div>
  );
}

export default App;
