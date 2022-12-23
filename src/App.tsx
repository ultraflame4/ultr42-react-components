import {TestComponent} from "./components/TestComponent/TestComponent";
import {TxtCharsFadeIn} from "./components/TextCharacterFadeIn/TxtCharsFadeIn";

function App() {

  return (
    <div className="App">
      <TestComponent/>
        <p>
            <TxtCharsFadeIn>
                Hello World!<br/>
                <b>Test</b>
            </TxtCharsFadeIn>
            <br/>
            <TxtCharsFadeIn className={"test"} style={{animationDuration:"20s"}}>
                Hello World!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████<br/>
                <b>Te!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████st</b>
            </TxtCharsFadeIn>
        </p>
    </div>
  )
}

export default App
