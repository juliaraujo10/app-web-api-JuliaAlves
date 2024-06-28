import { useState, useEffect } from 'react'
// import Container from '../components/Container/Container'
import Message from '../components/Message/message' 
import { useLocation} from 'react-router-dom'
import BookCard from '../components/BookCard/BookCard'
import styles from './style-pages/Book.module.css'


export default function Book(){

    const [books, setBooks] = useState([])
    const [bookMessage, setBookMessage] = useState("")


    useEffect(()=>{
        fetch('http://localhost:5000/listagemLivros',{
            method : 'GET',
            mode:'cors',
            headers: {
                'content-type':'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Acess-Control-Allow-Headers': '*'
        },
        })
        .then((resp) => resp.json())
        .then((data) => {setBooks(data.data)})
        .catch((err) => {console.log(err)})
},[]);



    const remove = (id) =>{
        fetch(`http://localhost:5000/excluirLivro/${id}`,{
            method : 'DELETE',
            headers: {
                'content-type':'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setBooks(books.filter((book_data)=> book_data.id_livro !== id ))
            setBookMessage('OKUMURA OKUYASU NI ZA HANDO NI KESU ')
        })
        .catch((err) => {console.log(err)})
    };

    const location = useLocation();
    let message  = ''

    if (location.state){
        message = location.state
    }


    return(
        
        <section className={styles.book_container}>
        
            <h1>LIVROS</h1>
            {
                message && <Message 
                    msg={message}
                    type="sucess"
                    />
            }

            {
                bookMessage && <Message 
                    msg={bookMessage}
                    type="sucess"
                    />
            }


            {
                books.map((book) =>(
                        <div key={book.id_livro}>
                            <BookCard
                            id={book.id_livro}
                            livro={book.nome_livro}
                            autor={book.autor_livro}
                            // categoria={book.category.category}
                            handlerRemove={remove}
                            />
                        </div>
                ))
            }
        </section>
        
    )
}