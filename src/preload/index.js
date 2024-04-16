import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { SerialPort } from 'serialport'
// Custom APIs for renderer
const api = {
  getCOMPorts: async () => {
    try {
      const ports = await SerialPort.list()
      return ports.map((port) => port.path)
    } catch (error) {
      console.error('Error listing ports:', error)
      return []
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

api
  .getCOMPorts()
  .then((ports) => console.log('Available COM ports:', ports))
  .catch((error) => console.error('Error listing ports:', error))
