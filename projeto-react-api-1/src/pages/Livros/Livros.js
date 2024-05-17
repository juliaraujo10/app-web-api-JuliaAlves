import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/Message/Message';
// import Container from '../../components/Container/Container';
import CardBook from '../../components/CardBook/CardBook';

import styles from './Livro.module.css'

import { Link } from 'react-router-dom';

function Livros() {

  const [books, setBooks] = useState([]);

  /*  ESTADO DE DADOS DA MENSAGEM DE EXCLUSÃO DE LIVRO */
  const [bookMessage, setBookMessage] = useState('');

  useEffect(()=>{
      fetch('http://localhost:5000/books', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json'
        },
      })
      .then((resp)=>resp.json())
      .then((data)=>setBooks(data))
      .catch((err)=>{console.log(err)});

  }, [books])

  /*FUNÇÃO DE EXCLUSAO DE LIVRO*/
  function removeBooks(id) {

    fetch(`http://localhost:5000/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(resp=> resp.json())
    .then(
      (data)=>{
        // setBooks(books.filter((book_data)=>book_data.id != id))
        // alert('LIVRO EXCLUÍDO')
        setBookMessage('LIVRO EXCLUÍDO COM SUCESSO!');
      }
    )
    .catch(err=>console.log(err))
  }

  const location = useLocation();
  let message = '';

  console.log('location state: ' + location.state);

  if (location.state){
    message = location.state;
  }
  return (
    <section className={styles.livros_container}>
      <h1>Aqui serão listados seus<span>livros</span></h1>

      {/*MENSAGEM DE SUCESSO PARA CADASTRO*/}

      {
        message && (
            <Message
                msg={message}
                type='sucess'
            />
        )
      }

      {/*MENSAGEM DE SUCESSO PARA EXCLUSÃO*/}

      {
        bookMessage && (
            <Message
                msg={bookMessage}
                type='sucess'
            />
        )
      }
      {/* <Container> */}
        {/* <CardBook
          id='1'
          livro='TESTE DE LIVRO-1'
          autor='TESTE DE AUTOR-1'
          categoria='TESTE DE CATEGORIA-1'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-2'
          autor='TESTE DE AUTOR-2'
          categoria='TESTE DE CATEGORIA-2'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-3'
          autor='TESTE DE AUTOR-3'
          categoria='TESTE DE CATEGORIA-3'>
        </CardBook> */}
      {/* </Container> */}
      
      {
        books.map((book)=>(
          <CardBook
              id={book.id}
              livro={book.nome_livro}
              autor={book.nome_autor}
              categoria={book.category.category}
              key={book.id}
              handlerRemove={removeBooks}>
          </CardBook>
        ))
      }

    </section>
  )
}

export default Livros;