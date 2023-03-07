const states = [
  { name: 'AC' },
  { name: 'AL' },
  { name: 'AP' },
  { name: 'AM' },
  { name: 'BA' },
  { name: 'CE' },
  { name: 'DF' },
  { name: 'ES' },
  { name: 'GO' },
  { name: 'MA' },
  { name: 'MT' },
  { name: 'MS' },
  { name: 'MG' },
  { name: 'PA' },
  { name: 'PB' },
  { name: 'PR' },
  { name: 'PE' },
  { name: 'PI' },
  { name: 'RJ' },
  { name: 'RN' },
  { name: 'RS' },
  { name: 'RO' },
  { name: 'RR' },
  { name: 'SC' },
  { name: 'SP' },
  { name: 'SE' },
  { name: 'TO' }
]

const allTowns = []
const fetchTowns = async () => {
  states.map((state) => {
    allTowns.push(
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.name}/municipios`
      ).then((response) => response.json())
    )
  })

  const allCitys = []

  await Promise.all(allTowns).then((states) => {
    states.map((citys) => {
      citys.map((city) => {
        allCitys.push(city.nome)
      })
    })
    allCitys.sort()
  })

  const select = document.querySelector('#towns')
  allCitys.map((city) => {
    let option = document.createElement('option')
    option.innerHTML = `${city}`
    select.appendChild(option)
  })
}

fetchTowns()
