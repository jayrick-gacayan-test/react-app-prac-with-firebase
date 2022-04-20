import './style.basic.css'
import hello from './img_hello_react.jpg';
const App = () => {
  return (
    <div>
      <h1>React Tutorial</h1>
      <p>First the using react.</p>
      <img  src={ hello } 
            alt="Hello React"
            style={{ height: "600px"}} />
        <p>First the using react.</p>
    </div>
  );
}

export default App;
