import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './coin';

function App() {

  const [coin, setcoin] = useState([])
  const [search, setsearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {setcoin(res.data)})
    .catch(error => alert(error.message))
  },[])

  const handleChange = e => {
    setsearch(e.target.value)
  }

  const filterCoins = coin.filter(coin =>  coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='coin-app'>
     <div className='coin-search'>
        <h1 className='coin-text'> Search a coin </h1>
        <form>
          <input 
            type="text" 
            className="coin-input" 
            placeholder='search a coin'
            onChange={handleChange}
            />
        </form>
     </div>
     {
      filterCoins.map(coin => {
        return(
          <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.market_cap_change_percentage_24h}
            marketcap={coin.market_cap}
            />
        )
      })
     }
    </div>
  );
}

export default App;
