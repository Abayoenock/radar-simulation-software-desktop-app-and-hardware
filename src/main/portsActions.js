import { SerialPort } from 'serialport'
//  choose the port to read  from
let port = null
export const connectPort = (portToConnect) => {
  console.log('Data received from renderer:', portToConnect)
  port = new SerialPort({ path: portToConnect, baudRate: 115200 })
}

export const startScan = () => {
  const dataToSend = 's' // Data to send
  port.write(dataToSend, (err) => {
    if (err) {
      return console.log('Error writing to serial port:', err.message)
    }
    console.log('Data sent to serial port:', dataToSend)
  })
}

export const stopScan = () => {
  const dataToSend = 't' // Data to send
  port.write(dataToSend, (err) => {
    if (err) {
      return console.log('Error writing to serial port:', err.message)
    }
    console.log('Data sent to serial port:', dataToSend)
  })
}

export const readData = (mainWindow) => {
  // read data from the serial port
  let receivedDataBuffer = ''
  port.on('data', (data) => {
    const receivedData = data.toString() // Convert data to string
    console.log(receivedData)

    // Append received data to the buffer
    receivedDataBuffer += receivedData

    // Check if the received data contains a new line character
    const newLineIndex = receivedDataBuffer.indexOf('\n')
    if (newLineIndex !== -1) {
      // Extract the part of data before the new line character
      const dataBeforeNewLine = receivedDataBuffer.substring(0, newLineIndex)

      // Try parsing the extracted data as JSON object
      try {
        const parsedData = JSON.parse(dataBeforeNewLine)

        // Check if the parsed data is an object
        if (typeof parsedData === 'object' && parsedData !== null) {
          // Send the parsed data to the renderer process
          mainWindow.webContents.send('serialData', parsedData)
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
      // Clear the buffer by removing the data before the new line character
      receivedDataBuffer = receivedDataBuffer.substring(newLineIndex + 1)
    }
  })
}
