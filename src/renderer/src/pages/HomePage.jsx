import { useEffect, useState, React } from 'react'
import Line from '../components/RadarUi/Line'
import Label from '../components/RadarUi/Label'
import ScanningLine from '../components/RadarUi/ScanningLine'
import Target from '../components/RadarUi/Target'
import '../components/RadarUi/RadarUi.css'
import DistanceCircle from '../components/RadarUi/DistanceCircle'
import { Button } from '@/components/ui/button'
import SelectPort from '../components/ComPorts/SelectPort'

function HomePage() {
  const [angleLines, setAngleLines] = useState(18)
  const [viewWidth, setViewWidth] = useState(500)
  const [lineAngle, setLineAngle] = useState(0)
  const [targets, setTargets] = useState([
    { angle: 45, distance: 7 }, // Initial target
    { angle: 135, distance: 5 }, // Another target
    { angle: 225, distance: 3 } // Yet another target
  ])

  const { ipcRenderer } = window.electron
  const [ports, setPorts] = useState(null)
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const ipcHandleHello = () => {
    window.api
      .getCOMPorts()
      .then((ports) => console.log(ports))
      .catch((error) => console.error('Error retrieving ports:', error))
  }

  const readPortData = () => {
    window.electron.ipcRenderer.send('portRead', 'COM13')
  }

  const startScan = () => {
    window.electron.ipcRenderer.send('startScan')
  }
  const stopScan = () => {
    window.electron.ipcRenderer.send('stopScan')
  }

  useEffect(() => {
    // Listen for serial data from the main process
    ipcRenderer.on('serialData', (event, data) => {
      // console.log(data)
      //setAngleLines(data.angle)
      //setSerialData(data)
    })

    // Clean up event listener when component unmounts
    return () => {
      ipcRenderer.removeAllListeners('serialData')
    }
  }, [])
  return (
    <main className="  w-full h-full">
      <div className=" flex gap-2">
        <Button>Hello</Button>
        <SelectPort />
        <button onClick={() => readPortData()} className=" bg-red-400">
          Read pORT
        </button>
        <button onClick={() => startScan()}>Start</button>
        <button onClick={() => stopScan()}>Stop</button>
      </div>

      <div id="radar-container">
        <div id="radar">
          {[...Array(angleLines)].map((_, index) => (
            <div key={index}>
              <Line key={`line${index}`} angle={index * (360 / angleLines)} />
              <Label
                key={`Label${index}`}
                angle={index * (360 / angleLines)}
                radarView={viewWidth}
              />
            </div>
          ))}
          <ScanningLine angle={0} />

          <DistanceCircle numCircles={9} radarView={viewWidth} />

          {/* Add logic to render targets */}
          {targets.map((target, i) => (
            <Target key={i} angle={target.angle} distance={target.distance} radarView={viewWidth} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
