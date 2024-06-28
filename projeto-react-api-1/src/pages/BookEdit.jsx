import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "./style-pages/BookEdit.module.css"
import Input from "../components/Form/Input"
import Select from "../components/Form/Select"

export default function BookEdit(params){
    
    const [book, setBook] = useState({})
    // const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        fetch(`http://localhost:5000/listagemLivro/${id}`,{
            method : 'GET',
            mode:'cors',
            headers: {
                'content-type':'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Acess-Control-Allow-Headers': '*'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {setBook(data.data); console.log(data)})
        .catch((err) => {console.log(err)})
},[]);

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

    const {id} = useParams()
    console.log(id)

    function handlerChangerBook(event){
        setBook({...book, [event.target.name] : event.target.value})
        console.log(book)
    }

    // function handlerChangerCategory(event){
    //     setBook({...book, category:{
    //         id: event.target.name,
    //         category: event.target.options[event.target.selectedIndex].text
    //     }})
    //     console.log(book)
    // }

    function editarLivro(book){
        fetch(`http://localhost:5000/alterarLivro/`,
        {
            method:'PUT',
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
                navigate('/book',{state:"Livro editado com sucesso "})
            })

        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

    function handlerSubmit(e){
        e.preventDefault();
        editarLivro(book)
        
    }

    return(
        <div className={styles.book_container}>
            <h1>Edição de livro</h1>

            <form onSubmit={handlerSubmit}>
                <Input 
                    type="text"
                    id="nome_livro"
                    name="nome_livro"
                    placeholder="Titulo do Livro:"
                    text=""
                    value={book.nome_livro}
                    handlerOnChange={handlerChangerBook}
                />

                <Input 
                    type="text"
                    name="autor_livro"
                    id="autor_livro"
                    placeholder="digite o titulo do autor"
                    text=""
                    value={book.autor_livro}                    
                    handlerOnChange={handlerChangerBook}
                />

                <Input 
                    type="text"
                    name="descricao_livro"
                    id="descricao_livro"
                    placeholder="digite a descricao do livro"
                    text="digite a descricao do livro"
                    value={book.descricao_livro}
                    handlerOnChange={handlerChangerBook}
                /> 

                {/* 
                <Select
                    handlerOnChange={handlerChangerCategory}
                    name="categoria_id"
                    text="selecione a categoria do livro"
                    options={categories}
                    // value={book.category.category}
                /> 
                */}

                <input type='submit' value="Editar Livro" />

            </form>
        </div>
    )
}