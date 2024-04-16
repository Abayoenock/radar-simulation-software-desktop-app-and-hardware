import { useEffect, useState } from 'react'

const ScanningLine = ({ angle }) => {
  const { ipcRenderer } = window.electron
  const [scanningLine, setScanningLine] = useState(angle)
  useEffect(() => {
    // Listen for serial data from the main process
    ipcRenderer.on('serialData', (event, data) => {
      console.log(data)
      setScanningLine(data.angle)
      //setSerialData(data)
    })

    // Clean up event listener when component unmounts
    return () => {
      ipcRenderer.removeAllListeners('serialData')
    }
  }, [])
  useEffect(() => {
    setScanningLine((prev) => angle)
  }, [angle])

  return <div className="scanning-line" style={{ transform: `rotate(${scanningLine}deg)` }}></div>
}

export default ScanningLine
