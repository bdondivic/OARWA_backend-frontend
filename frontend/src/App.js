import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Poruka from './components/Poruka'

const App = () => {
  const [ poruke, postaviPoruke] = useState([])
  const [ unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ ispisSve, postaviIspis] = useState(true)

  useEffect( () => {
    console.log("Dohvaćanje podataka")
    axios.get('http://localhost:3001/api/poruke')
      .then( res => postaviPoruke(res.data))
  }, [] )

  console.log("Renderiralo se " + poruke.length)

  const porukeZaIspis = ispisSve
  ? poruke
  : poruke.filter(poruka => poruka.vazno === true)

  const novaPoruka = (e) => {
    e.preventDefault()
    //console.log('Klik', e.target)
    const noviObjekt = {
      id: poruke.length + 1,
      sadrzaj: unosPoruke,
      datum: new Date().toISOString(),
      vazno: Math.random() > 0.5      
    }

    axios.post('http://localhost:3001/api/poruke', noviObjekt)
      .then( res => {
        console.log(res.data)
        postaviPoruke(poruke.concat(res.data)) //tu mora biti ono sto je vratio server, a ne novi objekt kojeg smo mi napravili
        postaviUnos('')
      } )

  }

  const promjenaVaznostiPoruke = (id) => {
    console.log(`Mijenjamo poruku ${id}`)	
    const url = `http://localhost:3001/api/poruke/${id}`
    const poruka = poruke.find( p => p.id === id )
  
    const modPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }
  
    axios.put(url, modPoruka)
      .then(res => {
        //console.log(res);
        postaviPoruke(poruke.map( p => p.id !== id ? p : res.data )) //umisto res.data moze biti i ModPoruka
      })
  }

  const promjenaUnosa = (e) => {
    postaviUnos(e.target.value)
  }
  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka key={p.id} poruka={p} promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)} /> 
        )}     
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

export default App