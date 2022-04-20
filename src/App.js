import hello from './img_hello_react.jpg';
const App = () => {
  return (
    <div>
      <img  src={ hello } 
            alt="Hello React"
            style={{ height: "600px"}} />
      First time using ReactJS
    </div>
  );
}

export default App;
