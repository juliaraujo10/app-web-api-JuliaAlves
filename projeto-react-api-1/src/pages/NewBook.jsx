import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Form/Input'
import styles from './style-pages/NewBook.module.css'
import Select from '../components/Form/Select'


export default function NewBook(){


    // const [categories, setCategories] = useState([]);
    const [book, setBook] = useState({});
    const navigate = useNavigate()

    ///////
    // Tirar o comentario quando fizer a tabela de categorias no back-end
    //
    // useEffect(() => {

    //     fetch('http://localhost:5000/categories',
    //     {
    //         method:'GET',
    //         headers:{'Content-Type' : 'application/json'}
    //     })
    //     .then(
    //         (resp)=>resp.json()
    //         )
    //     .then(
    //         (data) => {
    //             setCategories(data)
    //             console.log(data)
    //         }
    //     )
    //     .catch(
    //         (error)=>{
    //             console.log(error)
    //         }
    //     )}, [])
    ///////


    function handlerChangerBook(event){
        setBook({...book, [event.target.name] : event.target.value})
        console.log(book)
    }


    //
    //Tirar o comentario quando a tabela for feita no backend
    //
    // function handlerChangerCategory(event){
    //     setBook({...book, category:{
    //         id: event.target.name,
    //         category: event.target.options[event.target.selectedIndex].text
    //     }})
    //     // console.log(book)
    // }

    function createBook(book){
        fetch('http://localhost:5000/inserirLivro',
        {
            method:'POST',
            mode:'cors',
            headers:{   
                        'Content-Type' : 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        'Acess-Control-Allow-Headers': '*'
                    }
            
        ,
        body: JSON.stringify(book)
    })
        .then(
            (resp)=>resp.json()
        )
        .then(
            (data) => {
                console.log(data)
                navigate('/book',{state:"Livro cadastrado com sucesso "})
            })

        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

    function submit(event){
        event.preventDefault()
        createBook(book)
    }
    
    return(
        <section className={styles.newBook_container}>
            <h1>Nova página de cadastro de livro</h1>

            <form onSubmit={submit}>
                <Input 
                    type="text"
                    id="nome_livro"
                    name="nome_livro"
                    placeholder="digite o titulo do livro"
                    text="digite o titulo do livro"
                    handlerOnChange={handlerChangerBook}
                />

                <Input 
                    type="text"
                    name="autor_livro"
                    id="autor_livro"
                    placeholder="digite o titulo do autor"
                    text="digite o titulo do autor"
                    handlerOnChange={handlerChangerBook}
                />

                <Input 
                    type="text"
                    name="descricao_livro"
                    id="descricao_livro"
                    placeholder="digite a descricao do livro"
                    text="digite a descricao do livro"
                    handlerOnChange={handlerChangerBook}
                />

                {/* <Select
                handlerOnChange={handlerChangerCategory}
                name="categoria_id"
                text="selecione a categoria do livro"
                options={categories}
                /> */}

                <input 
                    type="submit"
                    value="cadastrar Livro"
                />
            </form>

        </section>
    )
}