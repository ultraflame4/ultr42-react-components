import {TestComponent} from "./components/TestComponent/TestComponent";
import {TxtCharsFadeIn} from "./components/TextCharacterFadeIn/TxtCharsFadeIn";
import {DnDItem, DnDItemContainer, DragAndDropContainer} from "./components/DragAndDrop/DragAndDrop";

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

        </p>

      <DragAndDropContainer
          items={["A","B","C","D",null,null,null]}
      />

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>
            <TxtCharsFadeIn className={"test"} style={{animationDuration:"20s"}} animateOnScroll={true}>
                Hello World!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████<br/>
                <b>Te!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████st</b>
            </TxtCharsFadeIn>
        </p>
    </div>
  )
}

export default App
