import React from 'react'

const DataBlock = ({icon, title, count}) => {
  return (
    <>
    <div className='data-block p-3 rounded-2'>
        <p className='data-icon'>{icon}</p>
        <h5 className='fw-medium data-title'>{title}</h5>
        <p className='data-count'>{count}</p>
    </div>
    </>
  )
}

export default DataBlock
