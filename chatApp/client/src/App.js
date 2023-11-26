import './App.css';
import cyan from './Images/cyan.png'
import bg from "./Images/bg.jpg"
import black from './Images/black.png'
import Register from './components/Register';

function App() {
  return (
    <div className='body-content'>
      <img src={black} alt="black" className='black' />
    <img src={cyan} alt="cyan" className='cyan' />
    <div className="main">
      <div className='signup'>
        <div className="signup-image">
            <img src={bg} alt="inner" />
            {/* <h2 className='txt'>Hello</h2> */}
        </div>
          <Register/>
      </div>
    </div>
    </div>
  );
}

export default App;
