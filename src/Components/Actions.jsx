import React from 'react'

function Actions({ filter, setFilter, selectedData }) {
  return (
    <div>
        <span>
            Search: {' '}
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)}/>
        </span>
        <code>
          {
            JSON.stringify(
              {
                selectedData: (selectedData),
              }, null, 2
            )
          }
        </code>
    </div>
  )
}

export default Actions