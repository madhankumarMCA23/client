import useform from './form.js'
export default function App()
{
  const [values,handleChange]=useform({year:'',name:'',email:'',password:'',checkbox:false})

  function handle(){
    console.log('values:',values);

  }
  return(<>
  <select name="year" id="year" value={values.year}
  onChange={handleChange}>
    <option value="freshman">freshman</option>
    <option value="sophmore">sophmore</option>
    <option value="junior">junior</option>
    <option value="senior">senior</option></select>
    <div>name</div>
    <input type="text" name="name" value={values.name} onChange={handleChange}/>
    <div>email</div>
    <input type="text" name="email" value={values.email}
    onChange={handleChange}/>
    <div>password</div>
    <input type="text" name="password" value={values.password}
    onChange={handleChange}/>
    
    <div>
    <input type="checkbox" name="checkbox" value={values.checkbox}
    onChange={handleChange}/>
    Remember me</div>
    <button onClick={handle}>submit</button>
</>)
}