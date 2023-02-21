import React, {useState} from 'react'
import Inputs from './components/input'
import Visualize from './components/visual'
export default function BinarySearch() {

  const [data, setData] = useState([[], 0])
  const [runSearch, setRunSearch] = useState(false)

  return(
    <>
      <h1 style={{textAlign:'center'}}>Binary Search</h1>
      <Inputs setData={setData} searchFunc={runSearch}/>
      <Visualize data={data} setRunSearch={setRunSearch}/>
    </>
  )
}