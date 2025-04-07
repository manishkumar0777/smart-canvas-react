
import './App.css'
import React from 'react'
import {
  CanvasControls,
  DrawingCanvas,
  ResponseDisplay,
  Header,
} from './components/index.js';


function App() {
const [isLoading, setIsLoading] = React.useState(false);
const [response, setResponse] = React.useState("");
const canvasRef = React.useRef(null);


  return (
    <>
    <Header />
    <div className="max-h-screen bg-gray-100 px-1">
    <div className="max-w-full mx-1"> 
      <div className="bg-white rounded-lg flex shadow-md px-1 py-4">
        {/* <DrawingCanvas ref={canvasRef} /> */}
        <div className='flex flex-col flex-shrink-0'>
        <CanvasControls 
          canvasRef={canvasRef} 
          setResponse={setResponse} 
          setIsLoading={setIsLoading}
        />
        </div>
        <div className='flex-1 min-w-[300px]'>
        <ResponseDisplay response={response} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-500">
        Draw your math problem on the canvas and click "Calculate"
      </div>
    </div>
  </div>
  </>
  )
}

export default App
