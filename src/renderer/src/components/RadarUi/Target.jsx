const Target = ({ angle, distance, radarView }) => {
  const scaledDistance = ((distance / 9) * radarView) / 2
  const radius = scaledDistance
  const x = Math.cos(angle * (Math.PI / 180)) * radius + radarView / 2
  const y = Math.sin(angle * (Math.PI / 180)) * radius + radarView / 2

  return (
    <div className="target" style={{ left: `${x}px`, top: `${y}px` }}>
      🛩️
    </div>
  )
}

export default Target
