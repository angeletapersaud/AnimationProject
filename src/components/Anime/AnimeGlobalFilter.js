import React, { useState } from 'react'

 const AnimeGlobalFilter = ({ filter, setFilter }) => {
  return (
   <div id='AnimeSearchBoxes'>
      <span id = 'AnimeGlobalFilter-span'>
      Filter:{' '}
      {/* <div id='AnimeSearchInputBoxes'> */}
      <input id='AnimeGlobalFilter-inputTextBox' value = {filter || ''}
          onChange ={e=>setFilter(e.target.value)}/>
      {/* </div> */}
    </span>
   </div>
  )
}
export default AnimeGlobalFilter