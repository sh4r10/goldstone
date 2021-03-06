import React, {useState, useEffect} from 'react';
import '../css/Settings.css';
import '../css/Main.css';

const Settings = ({darkmode, setDarkmode}) => {

    const [pref, setPref] =  useState({
        playlistId: "",
        continue: '',
        shuffle: '',
        darkmode: ''
    })

    const [saved, setSaved] = useState(true);

    useEffect(()=>{
        setPref(JSON.parse(localStorage.getItem("preferences")));;
    }, [])

    const inputChange = (e) => {
        setSaved(false);
        setPref(({...pref, [e.target.name]: e.target.value}));
    }

    const checkChange = e => {
        setSaved(false);
        setPref(({...pref, [e.currentTarget.name]: e.currentTarget.checked}))
    }

    useEffect(()=>{
        if(!saved){
            const btn = document.querySelector(".btn.btn-primary");
            btn.style.color = "var(--secondary";
            btn.innerHTML = "Save Changes";
            btn.style.background ="var(--primary)";
        }
    })

    const submit = (e) => {
        e.preventDefault();
        
        // Button Animation
        const btn = document.querySelector(".btn.btn-primary");
        btn.style.color = "#fff";
        btn.innerHTML = '<span class="material-icons">done</span>';
        btn.style.background = "var(--success)";
        setSaved(true);

        // Link Stripping
        var link = pref.playlistId.split("=");
        const playlistId = link.pop();
        setPref(({...pref, playlistId: playlistId}));

        // SavingLocal Storage 
        var local = JSON.parse(localStorage.getItem("preferences"));
        local.playlistId = playlistId;
        local.continue = pref.continue;
        local.shuffle = pref.shuffle;
        local.darkmode = pref.darkmode;
        localStorage.setItem("preferences", JSON.stringify(local));

        // Dark Mode Setting
        setDarkmode(pref.darkmode);
    }

    const restore = (e) => {
        e.preventDefault();
        localStorage.removeItem("preferences");
    }

    return (
        <div className={darkmode ? "main-container dark-mode" : "main-container light-mode"}>
            <div className="settings-header">
                <h1><a style={{"color": "var(--primary)"}} href="/"><i className="backbutton material-icons-round">arrow_back</i></a>Settings.</h1>
            </div>
            <div className="settings-display">
                <form className="settings-form" onSubmit={submit}>
                    <div className="settings-item">
                        <p>Youtube Playlist URL</p>
                        <input className="playlistLink" name="playlistId" type="text" placeholder="URL" value={pref.playlistId} onClick={(e) => e.target.select()} onChange={inputChange} />
                    </div>
                    <div className="settings-item">
                        <p>Continue playing after timer</p>
                        <div className="toggle-container">
                            <input id="switch" className="continueCheck" name="continue" type="checkbox" checked={pref.continue} onChange={checkChange} />
                            <label htmlFor="switch">Toggle</label>
                        </div>
                    </div>
                    <div className="settings-item">
                        <p>Shuffle</p>
                        <div className="toggle-container">
                            <input id="shuffle" name="shuffle" type="checkbox" checked={pref.shuffle} onChange={checkChange} />
                            <label htmlFor="shuffle">Toggle</label>
                        </div>
                    </div>
                    <div className="settings-item">
                        <p>Dark Mode</p>
                        <div className="toggle-container">
                            <input id="darkmode" name="darkmode" type="checkbox" checked={pref.darkmode} onChange={checkChange} />
                            <label htmlFor="darkmode">Toggle</label>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="btn" onClick={restore}>Restore Defaults</button>
                        <button className="btn btn-primary" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
            <div className="footer">
                <a href="mailto:iamsh4r10@gmail.com" target="_blank" rel="noopener noreferrer"><i className="material-icons-round">email</i></a>
                <p>Copyright {new Date().getFullYear()}, <span><a rel="noopener noreferrer" href="https://github.com/sh4r10" target="_blank">SH4R10</a></span>, All Rights Reserved.</p>
                <a id="paypal" target="_blank" href="https://paypal.me/sh4r10" rel="noopener noreferrer"><i className="fab fa-paypal"></i></a>
            </div>
        </div>
    )
}

export default Settings
