import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import Input from '../../components/Input/Input'
import Select from '../../components/Input/Select'

import styles from '../../pages/NovoLivro/NovoLivro.module.css'

export default function NovoLivro(){

  /*OBJETO DE NAVEGAÇÃO*/
  const navigate = useNavigate();

  /*STATE DE DADOS DAS CATEGORIAS VINDAS DO ARQUIVO db.json*/
  const [categories, setCategories] = useState([]);

  /*STATE DE DADPS QUE VAI ARMAZENAR O OBJETO JSON DE LIVRO*/
  const [book, setBook] = useState({});


  /**/
  useEffect(()=>{
  fetch (
      'http://localhost:5000/categories',
      {
        
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      }).then(
        (resp)=> 
          resp.json()
      ).then(
        (data)=> 
        {
          setCategories(data);
          console.log(data);
        }
      ).catch(
        (error)=>{
          console.log(error);
        }

      )
    })

    /*HANDLER DE CAPTURA DOS DADOS DE INPUT*/

      function handlerChangeBook(event) {
          setBook({...book, [event.target.name] : event.target.value});
          console.log(book)
    }

    /*HANDLER DE CAPTURA DOS DADOS DE SELECT*/

      function handlerChangeCategory(event) {
          setBook({...book, category:{
            id:event.target.value,
            category: event.target.options[event.target.selectedIndex.text]
          }});
          // console.log(book)
    }

    console.log(book)

    /*INSERÇÃO DOS DADOS DE LIVRO*/
    function creteBook(book) {

        fetch('https://localhost:5000/books', {
          method:'POST',
          headers:{
          'Content-Type':'application/json'
          },
          body: JSON.stringify(book)
        })
        .then(
          (resp)=>resp.json()
        )
        .then(
          (data)=>{
            console.log(data);
            navigate('/livros');
          }
        )
        .catch(
          (err)=>{ console.log(err)}
        )
    }
    
    /*FUNÇÃO DE SUBMIT*/
    function submit(event) {
      event.preventDefault();
      creteBook(book)
    }

  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastro de livro</h1>

      <form onSubmit={submit}>
        
          <Input
            type="text"
            name="nome_livro"
            id="nome_livro"
            placeholder="Digite o titulo do livro"
            text="Digite o titulo do livro"
            handlerOnChange={handlerChangeBook}
          />

          <Input
            type="text"
            name="nome_autor"
            id="nome_autor"
            placeholder="Digite o nome do autor"
            text="Digite o nome do autor"
            handlerOnChange={handlerChangeBook}
          />

          <Input
            type="text"
            name="descricao_livro"
            id="descricao_livro"
            placeholder="Digite a descricao do livro"
            text="digite a descricao do livro"
            handlerOnChange={handlerChangeBook}
          />
      
          <Select 
            name="categoria_id"
            text="Selecione a categoria do livro"
            options={categories}
            handlerOnChange={handlerChangeCategory}
          />

        <p>
          <Input type='submit' value='Cadastrar um livro'/>
        </p>

      </form>

    </section>
  )
}
