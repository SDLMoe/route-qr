import React, {useState} from 'react';
import QRCode from 'react-qr-code';
import './App.css';

function getParams(name: string): string | undefined {
    if (window.location.search === undefined || window.location.search === "") return undefined
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substring(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return undefined
}

function App() {
    const [text] = useState(getParams("text"))
    const [formText, setFormText] = useState("")
    const ele = text === undefined
        ? <form onSubmit={() => window.location.search = "&text=" + formText}>
            <label>
                Text to show:
                <input type="text" name="text" value={formText} onChange={(event) => {
                    setFormText(() => event.currentTarget?.value)
                }}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
        : <QRCode value={text}/>
    return (
        <div className="App">
            {ele}
        </div>
    );
}

export default App;
