const Label = ({ angle, radarView }) => {
  const labelX = Math.cos((angle * Math.PI) / 180) * (radarView / 2 + 5) + radarView / 2
  const labelY = Math.sin((angle * Math.PI) / 180) * (radarView / 2 + 5) + radarView / 2

  let transformStyle
  if (angle > 90 && angle < 270) {
    transformStyle = 'translate(-100%, -50%)'
  } else {
    transformStyle = 'translate(0%, -50%)'
  }

  return (
    <div
      className="label-text"
      style={{ left: `${labelX}px`, top: `${labelY}px`, transform: transformStyle }}
    >
      {angle}°
    </div>
  )
}

export default Label
