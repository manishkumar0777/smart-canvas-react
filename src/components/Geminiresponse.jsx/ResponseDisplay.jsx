import React from 'react'
import ReactMarkdown from 'react-markdown'

function ResponseDisplay({ response, isLoading }) {
  return (
    <div className='mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-full overflow-x-auto'>
      <h3 className='text-lg font-semibold mb-2'>Solution:</h3>
      {isLoading ? (
        <div className='flex items-center justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      ) : (
        <div className='whitespace-pre-wrap break-words text-base'>
          <ReactMarkdown>{response || "Your solution will appear here"}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default ResponseDisplay
