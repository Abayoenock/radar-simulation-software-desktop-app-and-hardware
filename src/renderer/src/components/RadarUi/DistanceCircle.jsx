const DistanceCircle = ({ numCircles, radarView }) => {
  const circleStep = radarView / numCircles
  const circles = []

  for (let j = 1; j <= numCircles; j++) {
    const circleSize = circleStep * j
    const circleStyle = {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      top: `${radarView / 2 - circleSize / 2}px`,
      left: `${radarView / 2 - circleSize / 2}px`
    }
    circles.push(<div key={`cycle${j}`} className="distance-circle" style={circleStyle} />)
  }

  return <>{circles}</>
}

export default DistanceCircle
