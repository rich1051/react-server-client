import {useState, useEffect} from 'react';
import axios from 'axios';

function App () {
 
  const [creatureList, setCreatureList] = useState([]);
  const [creatureNameInput, setCreatureNameInput] = useState('')
  const [creatureOriginInput, setCreatureOriginInput] = useState('')

// $(document).ready
  useEffect(() => {
    fetchCreatures();
  }, []) // empty array tells it to run only once (on page load)

  const fetchCreatures = () => {
    axios.get('/creature')
    .then((response) => {
      console.log(response.data);
      setCreatureList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted!');

    axios.post('/creature',{
        name: creatureNameInput,
        origin: creatureOriginInput
    }).then((response) => {
      fetchCreatures();
      setCreatureNameInput('');
      setCreatureOriginInput('');
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>
      <h2>Add Creature:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name: </label>
        <input value={creatureNameInput} id='name' onChange={(event) => setCreatureNameInput(event.target.value)}/>
        <label htmlFor='origin'>Origin: </label>
        <input value={creatureOriginInput} id='origin' onChange={(event) => setCreatureOriginInput(event.target.value)}/>
        <button type='submit'>Add Creature</button>
      </form>
      <ul>
        {creatureList.map(creature => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
