import styles from './EditarLivro.module.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../components/Input/Input';
import Select from '../components/Select/Select';

function EditarLivro(params) {

    // STATE DE DADOS DE CATEGORIAS VINDAS DO ARQUIVO db.json
    const [categories, setCategories] = useState([]);

    /* RECUPERANDO O ID DA URL */
    const {id} = useParams();
    console.log('ID:' + id);


    const [book, setBook] = useState({});

      // RECUPERA OS DADOS DE CATEGORIA DO ARQUIVO db.json
  useEffect(()=>{
    fetch
        ('http://localhost:5000/categories',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) =>resp.json()
        ).then(
          (data)=>{
            setCategories(data)
            console.log(data)
          }
        )
      .catch((error) => {
        console.log(error)
      })
  },[])

    /* RECUPERANDO OS DADOS DE LIVRO PARA A EDIÇÃO*/
    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          },
        })
        .then((resp)=>resp.json())
        .then((data)=>{setBook(data);
            console.log(data);
        })
        .catch((err)=>{console.log(err)});
  
    }, [])

     // HANDLER DE CAPTURA DOS DADOS DE INPUT (NOME, LIVRO, AUTOR, DESCRIÇÃO)
     function handlerChangeBook(event) {
        setBook({...book, [event.target.name] : event.target.value});
        console.log(book);
      }
  
    // HANDLER DE CAPTURA DOS DADOS DE SELECT (ID E CATEGORIA)
      function handlerChangeCategory(event) {
        setBook({...book, category:{
          id: event.target.value,
          category: event.target.options[event.target.selectedIndex].text
        }});
      }
      console.log(book);

    return (
        <div className={styles.book_container}> 
            <h1>EDIÇÃO DE LIVRO</h1>

            <form>

            <Input
                type="text"
                name="nome_livro"
                id="nome_livro"
                placeholder="Digite o titulo do livro"
                text="Digite o título do livro:"
                value={book.nome_livro}
                handlerOnChange={handlerChangeBook}
            />

            <Input
                type="text"
                name="nome_autor"
                id="nome_autor"
                placeholder="Digite o nome do autor"
                text="Digite o nome do autor:"
                value={book.nome_autor}
                handlerOnChange={handlerChangeBook}
            />

            <Input
                type="text"
                name="descricao_livro"
                id="descricao_livro"
                placeholder="Digite a descricao do livro"
                text="Digite a descrição do livro:"
                value={book.descricao_livro}
                handlerOnChange={handlerChangeBook}
            />

            <Select
                name="categoria-id"
                text="Selecione a categoria do livro:"
                options={categories}
                handlerOnChange={handlerChangeCategory}
            />

            </form>

        </div>
    )

}

export default EditarLivro