import React from 'react'
import { Square, Circle, Triangle, Pencil, Trash2 } from 'lucide-react';

function Tools({
    setPenColor, 
    setStrokeWidth, 
    setSelectedTool,
    handleClear,
    strokeWidth,
    penColor,
    selectedTool,
    handleCalculate
}) {


    //All Tools
    const tools = [
        { name: 'pen', icon: <Pencil /> },
        { name: 'rectangle', icon: <Square /> },
        { name: 'square', icon: <Square /> },
        { name: 'circle', icon: <Circle /> },
        { name: 'triangle', icon: <Triangle /> },
        { name: 'right-triangle', icon: <Triangle className="rotate-90" /> },
    ];

    //All Colors
    const colorOptions = ['#000000', '#FF0000', '#007bff', '#28a745', '#ff9800', '#800080', '#00CED1'];


    return (
        <div className="flex flex-wrap justify-center items-center gap-6">
        
                {/* Calculate Button */}
                <button
                  name="clear"
                  onClick={handleCalculate}
                  className="bg-green-600 hover:bg-green-500 
                             hover:scale-110 transition hover:cursor-pointer
                           text-white font-bold py-2 px-4 rounded w-24"
                >
                  Calculate
                </button>
                {/* Tool Selector */}
                <div className="flex gap-2 items-center">
                  {tools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => setSelectedTool(tool.name)}
                      className={`p-1.5 items-center justify-center flex rounded-full border border-gray-300 transition cursor-pointer hover:scale-125 ${selectedTool === tool.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
                      title={tool.name}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>
        
                {/* Color Picker */}
                <div className="flex items-center gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      className={`w-8 h-8 hover:scale-125 cursor-pointer rounded-full border-1 ${penColor === color ? 'border-black scale-120' : 'border-gray-300'} transition`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
        
                {/* Stroke Picker */}
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className={`w-28 h-8 transition appearance-none hover:scale-110 bg-gray-300 rounded-full
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:h-7
                               [&::-webkit-slider-thumb]:w-7
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-blue-500`}
                  />
                  <span className="text-sm text-gray-600">{strokeWidth}px</span>
                </div>
                  
                  {/* Clear Button */}
                <button
                  onClick={handleClear}
                  className="bg-red-600 flex hover:bg-red-500 
                             hover:scale-110 cursor-pointer transition 
                             items-center justify-center text-white 
                             p-2 rounded-full w-10 h-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
        
              </div>
    )
}

export default Tools