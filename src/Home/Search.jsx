import React, { useContext,useEffect,useState } from 'react'
import { ProductContext } from '../Product/ProductContext'
import './search.css'

const Search = () => {
    const [searchValue,setSearch]=useState('')
    const [filterItems, setFilterItems] = useState([]);

    const {allProducts}=useContext(ProductContext)
    useEffect(() => {
        const Items = allProducts.filter(item => 
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilterItems(Items); // Store the filtered products in state
    }, [searchValue, allProducts]);
  return (
    <div >
        <form>
            <input value={searchValue} onChange={(e)=>setSearch(e.target.value)}></input>
        </form>
      {filterItems.map((item,ind)=>(<div className='list' key={ind}>
        <p>{item.name}</p>
        <img className='searchPic' src={item.pic[0]} alt="" />
        </div>
      ))}
    </div>
  )
}

export default Search
