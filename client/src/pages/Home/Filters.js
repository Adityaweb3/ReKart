import React from 'react'

function Filters(
    {
     showFilters , 
    setShowFilters , 
    filters , 
    setFilters,

    }
) {
  return (
    <div className='w-80'>
        <div className='flex justify-between'>
            <h1 className='text-orange-900 text-xl'>
                Filters
            </h1>
            <i class="ri-close-line text-xl cursor-pointer"
            onClick={()=>setShowFilters(!showFilters)}
            ></i>
        </div>
    </div>
  )
}

export default Filters