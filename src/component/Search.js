import React,{useState} from 'react'

function Search() {

    const [searchField, setSearchField] = useState("")


  return (
    <div>
        <h6>Search data</h6>
        <input type="text" placeholder="Search.." onChange={(e)=>setSearchField(e.target.value)}/>


    </div>
  )
}

export default Search