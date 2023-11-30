import React from 'react'

type propsType = {
  color?: string;
}

const Loading = ({color}: propsType) => {
  return (
    <div className={`animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent ${color || 'text-gray-800'} rounded-full dark:text-white`} role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
  )
}

export default Loading