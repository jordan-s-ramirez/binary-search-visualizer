import React, {useState, useEffect} from "react";
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import generateRandArray from "./helper";

export default function Inputs(props) {
  const [arrSize, setArrSize] = useState(5)
  const [arr, setArr] = useState(generateRandArray(arrSize))
  const [target, setTarget] = useState(arr[0])
  const [arrText, setArrText] = useState(arr.join(","))

  useEffect(()=>{
    props.setData([arr, target])
  },[])

  const handleTarget = (val) => {
    // var intVal = 0
    // if(val !== "") {
    // }
    var intVal = parseInt(val)
    setTarget(intVal)
    // Set Data to main
    props.setData([arr, intVal])
  }

  const handleArrSize = (val) => {
    if(val > 20) {
      alert("Array Must be less than 10!")
      return
    }
    // Generate Array
    var arr = generateRandArray(val)

    // Set array
    setArr(arr)
    setArrText(arr.join(","))
    setArrSize(val)

    // Set Data to main
    props.setData([arr, target])
  }

  const handleArrText = (string) => {
    // Vars
    var isComma = false

    // Regex
    var re = /[0-9||,]+/g;
    try {
      string = string.match(re).join("")
    } catch {
    }
    // Set Arr
    string = string.split(",")
    if(string[string.length - 1] === "") {
      string.pop()
      isComma = true
    }
    setArr(string)
    // Set Data to main
    props.setData([string, target])

    // Set Size
    setArrSize(string.length)
    string = string.join(",")
    if(string[string.length - 1] !== "," && isComma) {
      string += ","
    }
    // Set Text
    setArrText(string)

  }

  return(
    <>
      <Grid container spacing={2} style={{alignItem:'center', justifyContent:'center'}}>
        <Grid item>
          <TextField
            value={target}
            id="outlined-number"
            label="Target"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{handleTarget(e.target.value)}}
            />
        </Grid>
        <Grid item>
          <TextField
            value={arrSize}
            id="outlined-number"
            label="Array Size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{handleArrSize(e.target.value)}}
          />
        </Grid>
      </Grid>
      <Grid container style={{marginTop: '2vh', alignItem:'center', justifyContent:'center'}}>
        <Grid item>
          <TextField
            value={arrText}
            id="outlined-number"
            label="Array Items"
            multiline
            rows={2}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{handleArrText(e.target.value)}}
          />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2} style={{alignItem:'center', justifyContent:'center', marginTop: '2vh'}}>
        <Grid item>
          <Button variant="contained" onClick={()=>{props.setData([arr, parseInt(target)])}}>Visualize Array</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={props.searchFunc}>Run Search</Button>
        </Grid>
      </Grid> */}
    </>
  )
}