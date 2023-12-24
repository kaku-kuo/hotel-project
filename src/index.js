import ReactDOM from 'react-dom/client'
import RoomAllocation from './components/RoomAllocation'

function App() {
  return (
    <div>
      <div style={{ width: '560px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Alan's project</h1>
        </div>
        <RoomAllocation guest={10} room={3} onChange={result => console.log('result', result)} />
      </div>
    </div>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)
