import pkg from '../../../package.json'

const Health = () => {
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <h1>Health</h1>
      <p>Name: {pkg.name}</p>
      <p>Version: {pkg.version}</p>
    </div>
  )
}

export default Health
