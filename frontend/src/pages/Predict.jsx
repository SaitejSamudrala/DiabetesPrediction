import React,{useState,useEffect} from 'react'

const Predict = () => {
    let [result,setResult] = useState([])

    useEffect(() => {
        getResult()
    },[])

    let getResult =  async () => {
        let response = await fetch('http://127.0.0.1:8000/api/')
        let data = await response.json()
        console.log('DATA:', data)
        setResult(data)

    }
  return (
    <div>
        <div className='data'>
            <h3>{result.message}</h3>
        </div>
        sample
    </div>
  )
}

export default Predict
