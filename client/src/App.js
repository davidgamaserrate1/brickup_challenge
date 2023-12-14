
import {useState, useEffect} from 'react'


const url ='http://localhost:8080/task'
function App() {
  const [tasks, setTasks] = useState()


  async function test(){
    await fetch(url)
    .then((response)=>response.json())
    .then((response)=>setTasks(response))
  }

  useEffect(()=>{
    test()
  },[])
  console.log(tasks)

  return (
    <div >
      app
    </div>
  );
}

export default App;
