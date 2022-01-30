import React, { useState } from 'react'

 const GhibliFilmGlobalFilter = ({ filter, setFilter }) => {
  return (
    <span id = 'GhibliFilmGlobalFilter-span'>
      Filter:{' '}
      <input id='GhibliFilmGlobalFilter-inputTextBox' value = {filter || ''}
          onChange ={e=>setFilter(e.target.value)}/>
    </span>
  )
}
export default GhibliFilmGlobalFilter