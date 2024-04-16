import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
const { ipcRenderer } = window.electron

const SelectPort = () => {
  const [ports, setPorts] = React.useState([])
  const [selectedPort, setSelectedPort] = React.useState(null)
  React.useEffect(() => {
    // Listen for serial data from the main process
    ipcRenderer.on('serialPorts', (event, data) => {
      if (data.length > ports.length) {
        setPorts(data)
      }
    })

    // Clean up event listener when component unmounts
    return () => {
      ipcRenderer.removeAllListeners('serialData')
    }
  }, [])

  return (
    <Select
      onValueChange={(port) => {
        setSelectedPort(port)
        window.electron.ipcRenderer.send('portRead', port)
        console.log(port)
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Choose COM Port" />
      </SelectTrigger>
      <SelectContent>
        {ports.map((port, index) => {
          return (
            <SelectItem value={port.path} key={port.path}>
              {port.path} [{port.friendlyName}]
            </SelectItem>
          )
        })}
        {ports.length == 0 && (
          <SelectItem value="msk" disabled={true}>
            No ports available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
export default SelectPort
