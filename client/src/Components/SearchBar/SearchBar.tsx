import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.css';

interface ISearchBar {
  onSearch: (input:string) => void;
}

const SearchBar = ({onSearch}:ISearchBar): JSX.Element => {
/*   const [title, setTitle] = useState(""); */
  const [input, setInput ] = useState<string>('');
/*   const [filterp, setFilterp] = useState([]); */
/*   const dispatch = useDispatch();
  const products:any = useSelector<any>(s => s.products); */

  const handleChange = (event:ChangeEvent):void=>{
    const {value} = event.target as HTMLInputElement
    setInput(value)
  }

  const handleSelect=(event:ChangeEvent):void=>{
    const {value} = event.target as HTMLSelectElement
    alert(value)
  }

/*   useEffect(() => {
    dispatch(getProducts())
  }, []) */

  useEffect(() => {
    onSearch(input.toLowerCase());
  }, [input]);

  return (
    <div >
    <div className='container-search'>
      
      <input type="text"
      autoComplete="off"
      value={input}
      onChange={handleChange}    
      placeholder='Find product'  
      />
      <select onChange={handleSelect}>
        <option>Accesories</option>
        <option>Kids</option>
        <option>Men</option>
        <option>Women</option>
      </select>
   {/*    <span className='icon'> <BsSearch/> </span> */}
{/*       <button type='submit'>
        Search <VscSearch/>
      </button> */}
    </div>
  </div>
  )
};

export default SearchBar;