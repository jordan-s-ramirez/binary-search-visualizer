import React, {useEffect, useState} from "react";
import { Grid, Button } from "@mui/material";
import Chip from '@mui/material/Chip';
// import { motion, useAnimationControls } from "framer-motion";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Visualize(props) {
  // // Animation Controls
  // const controls = useAnimationControls()

  // [arr, target, states]
  // const [targetIndex, setTargetIndex] = useState(0)
  const [currData, setCurrData] = useState([])
  const [target, setTarget] = useState(props.data[1])
  const [runButton, setRunButton] = useState("primary")

  // Curr Status
  const [mid, setMid] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [logs, setLogs] = useState([])

  const statusKey = {
    target: "orange",
    default: "gray",
    bounds: 'yellow',
    mid: "green"
  }

  async function search() {
    // Reset Logs
    setLogs([])
    // Button UI
    setRunButton("success")

    // Vars
    var arr = Array.from(currData)
    var left = 0
    var right = arr.length - 1
    var mid = Math.floor((left + right)/2)
    var initalString = "Left index = 0, Right index = "+right;
    var newLogs = [initalString]
    // var oldStatus

    while(left <= right) {
      // Update Mid
      arr[mid]["status"] = statusKey.default 
      mid = Math.floor((left + right)/2)
      arr[mid]["status"] = statusKey.mid
      setMid(mid)
      setCurrData(Array.from(arr))
      newLogs.push("Mid  index set: arr["+mid+"] = "+arr[mid].value)
      setLogs(Array.from(newLogs))

      // Sleeps so user can visualize code
      await sleep(1000)
      console.log(arr[left].value, arr[mid].value, arr[right].value)
      
      if(arr[mid]["value"] === target) {
        newLogs.push("Target Found: arr["+mid+"] = "+target)
        setLogs(Array.from(newLogs))
        // Button UI
        setRunButton("primary")
        return mid
      }
      else if(arr[mid]["value"] < target) {
        arr[left]["status"] = statusKey.default 
        left = mid + 1
        setLeft(left)
        newLogs.push("Left index set: arr["+left+"] = "+arr[left].value)
        arr[left]["status"] = statusKey.bounds
      }
      else {
        arr[right]["status"] = statusKey.default 
        right = mid - 1
        setRight(right)
        newLogs.push("Right index set: arr["+right+"] = "+arr[right].value)
        arr[right]["status"] = statusKey.bounds
      }
      // Runs Smoother
      arr[mid]["status"] = statusKey.default
      // Update Curr Data
      setLogs(Array.from(newLogs))
      setCurrData(Array.from(arr))

      // Sleeps so user can visualize code
      await sleep(1000)
    }
    console.log("Binary Search", -1)
    // Button UI
    setRunButton("primary")
    return -1
  }

  function handleData() {
    var newArr = []
    var val = 0
    var tar = parseInt(props.data[1])
    // var isNotSet = true
    for(var i = 0; i < props.data[0].length; i++) {
      val = parseInt(props.data[0][i])
      // Value is target
      if(val === tar) {
        newArr.push({"value": val, "status":statusKey["target"]})
        // if(isNotSet) {
        //   setTargetIndex(i)
        //   isNotSet = false
        // }
      }
      else {
        newArr.push({"value": val, "status":statusKey["default"]})
      }
    }

    if(newArr.length > 2) {
      newArr[0].status = statusKey["bounds"]
      newArr[newArr.length - 1].status = statusKey["bounds"]
    }
    
    setCurrData(newArr)
    setTarget(tar)
  }

  // Save intial data
  useEffect(()=>{
    handleData()
  },[])

  return(
    <>
      <Grid container spacing={2} style={{alignItem:'center', justifyContent:'center', marginTop: '2vh'}}>
        <Grid item>
          <Button variant="contained" onClick={handleData}>Visualize Array</Button>
        </Grid>
        <Grid item>
          <Button color={runButton} variant="contained" onClick={()=>{search()}}>Run Search</Button>
        </Grid>
      </Grid>
      <h2 style={{marginTop: '2vh', textAlign: 'center'}}>Live Status</h2>
      <Grid container spacing={2} style={{alignItem:'center', justifyContent:'center'}}>
        <Grid item>
          <Chip label={"Left Index: " + left} variant="outlined" />
        </Grid>
        <Grid item>
          <Chip label={"Middle Index: " + mid} variant="outlined" />
        </Grid>
        <Grid item>
          <Chip label={"Right Index: " + right} variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{alignItem:'center', justifyContent:'center'}}>
        {
          currData.map((obj, idx) => {
            return(
              <Grid item key={idx} sx={1}>
                <div style={{backgroundColor: obj.status, textAlign: 'center', borderRadius:'20%', width:'150%'}}>
                  <h1>{obj.value}</h1>
                </div>
                {/* <motion.div
                  // animate={controls}
                  animate={{x:100}}
                  transition={{ type: "spring", stiffness: 85 }}
                >
                  <h1>{obj.value}</h1>
                </motion.div> */}
              </Grid>
            )
          })
        }
      </Grid>
      <Grid container spacing={2} style={{alignItem:'center', justifyContent:'center', marginTop: '2vh'}}>
        <Grid item>
          <h2 style={{marginTop: '2vh', textAlign: 'center'}}>Logs</h2>
          <ul>
            {logs.map((obj, idx) => {
              return(
                <li key={idx}>{obj}</li>
              )
            })}
          </ul>
        </Grid>
      </Grid>
    </>
  )
}