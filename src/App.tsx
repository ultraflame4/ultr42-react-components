import {TestComponent} from "./components/TestComponent/TestComponent";
import {TxtCharsFadeIn} from "./components/TextCharacterFadeIn/TxtCharsFadeIn";
import {DnDItem, DnDItemContainer, DragAndDropContainer} from "./components/DragAndDrop/DragAndDrop";
import {DnDList} from "./components/DnDList/DnDList";

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
                itemData={["A", "B", "C", "D", null, null, null]}
                itemDataAdapter={(item, index) => item}
                env={(itemContainers, itemData) => {
                    return (<>
                        {
                            itemContainers.map((value, index) => {
                                return <div key={index} style={{display: "flex"}}>
                                    <h2>{index}.</h2>
                                    {value}
                                </div>
                            })
                        }

                    </>)
                }}
            />


            {/*<DnDList items={["A", "B", "C", "D"]} itemAdapter={item => item}/>*/}
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
                <TxtCharsFadeIn className={"test"} style={{animationDuration: "20s"}} animateOnScroll={true}>
                    Hello
                    World!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████<br/>
                    <b>Te!███████████████████████████████████!███████████████████████████████████!███████████████████████████████████st</b>
                </TxtCharsFadeIn>
            </p>
        </div>
    )
}

export default App
