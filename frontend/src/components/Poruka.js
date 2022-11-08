import React from 'react'

const Poruka = ({poruka, promjenaVaznosti}) => {
  const oznaka = poruka.vazno
  ? 'Označi kao nevažno'
  : 'Označi kao važno'

  return (
    <li>
      {poruka.sadrzaj}
      <button onClick={promjenaVaznosti}>{oznaka}</button>
    </li>
  )
}

export default Poruka