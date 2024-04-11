import style from '../Input/Select.modules.css'

export default function select({text, name, options, handlerOnChange, value}) 

{
  return (
    <div className={style.form_control}>
      <label htmlFor={name}>{text}</label>
        <select name={name} id={id} onChange={handlerOnChange}>

        <option>Selecione uma categoria</option>

        {
            options.map((option) => (
                <option
                  value={option.id}
                  key={option.id}>

                    {option.name}

                </option>
            ))
        }
        </select>
        
    </div>
  )
}
