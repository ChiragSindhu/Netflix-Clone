import React, { Component } from 'react';

import NavSetting from '../components/leftNavSetting.js';
import './index.css';

class SettingsPage extends Component {
    constructor(){
        super();

        this.autoplaynextepisodeRef = React.createRef();
        this.autoplaypreviewsRef = React.createRef();
        this.autodatausageRef = React.createRef();
        this.lowdatausageRef = React.createRef();
        this.mediumdatausageRef = React.createRef();
        this.highdatausageRef = React.createRef();
        this.languageRef = React.createRef();
        this.subtitlelanguageRefRef = React.createRef();
        this.themeRef = React.createRef();
        this.alertMessageRef = React.createRef();

        this.settingcomponent = React.createRef();
    }

    componentDidMount = () => 
    {
        this.UpdateSettingsGfx();
        if(document.documentElement.className.length === 0)
        {
            document.documentElement.className = localStorage.getItem('theme').replace(' ','');
        }
    }

    render() { 
        return (
        <div id="main">
            <NavSetting />
            <div id="alertMessage" ref={this.alertMessageRef}>✅ Settings saved.</div>
            <div className="settingComponent" ref={this.settingcomponent}>
                <div id="componentsettingHeading">Settings</div>
                <div id="autoplaycontrols">
                    <div id="autoplaycontrolstext">Autoplay controls</div>
                    
                    <input ref={this.autoplaynextepisodeRef} type="checkbox" id="autoplaycheckbox" />
                    <span id="autoplaycheckboxtext"> Autoplay next episode in a series.</span>
                    <br />
                    
                    <input ref={this.autoplaypreviewsRef} type="checkbox" id="autoplaycheckbox" />
                    <span id="autoplaycheckboxtext"> Autoplay previews.</span>
                </div>

                <div id="seperator"></div>
                
                <div id="defaultLanguage">
                    <div id="defaultvideolanguage">
                        <div id="defaultheading">Language</div>
                        <select id="defaultvideolanguageselect" ref={this.languageRef}>
                            <option>Hindi</option>
                            <option>English</option>
                        </select>
                    </div>
                    <div id="defaultvideosubtitle">
                        <div id="defaultheading">Subtitle Language</div>
                        <select id="defaultvideolanguageselect" ref={this.subtitlelanguageRefRef}>
                            <option>English</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                </div>

                <div id="seperator"></div>

                <div id="datausage">
                    <div id="datausagetext">Data usage per screen</div>
                
                    <div id="datausagegroup">
                        <input ref={this.autodatausageRef} type="radio" id="radiodatausage" name="datausageradio" />
                        <span id="radioheadingtextgroup">
                            <div id="radiodatausageheadingtext"> Auto</div>
                            <div id="radiodatausagecontenttext"> Defauft video quality and data usage</div>
                        </span>
                    </div>

                    <div id="datausagegroup">
                        <input ref={this.lowdatausageRef} type="radio" id="radiodatausage" name="datausageradio"/>
                        <span id="radioheadingtextgroup">
                            <div id="radiodatausageheadingtext"> Low</div>
                            <div id="radiodatausagecontenttext"> Basic video quality, up to 0.3 GB per hour</div>
                        </span>
                    </div>

                    <div id="datausagegroup">
                        <input ref={this.mediumdatausageRef} type="radio" id="radiodatausage" name="datausageradio"/>
                        <span id="radioheadingtextgroup">
                            <div id="radiodatausageheadingtext"> Medium</div>
                            <div id="radiodatausagecontenttext"> Standard video quality, up to 0.7 GB per hour</div>
                        </span>
                    </div>

                    <div id="datausagegroup">
                        <input ref={this.highdatausageRef} type="radio" id="radiodatausage" name="datausageradio"/>
                        <span id="radioheadingtextgroup">
                            <div id="radiodatausageheadingtext"> High</div>
                            <div id="radiodatausagecontenttext"> Best video quality, up to 3 GB per hour fo HD, 7 GB per hour for UltraHD</div>
                        </span>
                    </div>
                </div>

                <div id="seperator"></div>

                <div id="autoplaycontrols">
                    <div id="defaultheading">Theme</div>
                    <select id="defaultvideolanguageselect" ref={this.themeRef}>
                        <option>Light Theme</option>
                        <option>Dark Theme</option>
                        <option>Netflix Theme</option>
                        <option>Discord Theme</option>
                    </select>
                </div>

                <div id="savebtngroup">
                    <input type="button" value="Save" className="settingsavebutton" id="savesettingbtn" onClick={this.SaveSettings} />
                    <input type="button" value="Default" className="settingsavebutton" id="defaultsettingbtn" onClick={this.DefaultSettings}/>
                </div>
            </div>
        </div>
        );
    }

    DefaultSettings = ()=> 
    {
        localStorage.setItem('autoplaynextepisode','true');
        localStorage.setItem('autoplaypreviews','true');
        localStorage.setItem('language','Hindi');
        localStorage.setItem('subtitlelanguage', 'English');
        localStorage.setItem('datausage','Auto');
        localStorage.setItem('theme','Light Theme');

        this.UpdateSettingsGfx();
        this.alertMessageRef.current.style.top = "2rem";
        this.alertMessageRef.current.innerText = "✅ Settings saved.";
        setTimeout(()=>{this.alertMessageRef.current.style.top = "-5rem";document.documentElement.className = localStorage.getItem('theme').replace(' ','');},2000)
        this.settingcomponent.current.scrollTo(0, 0);
    }

    SaveSettings = () =>
    {
        if(this.autoplaynextepisodeRef.current.checked.toString() === "true")
            localStorage.setItem('autoplaynextepisode','true');
        else
            localStorage.setItem('autoplaynextepisode','false');

        if(this.autoplaypreviewsRef.current.checked.toString() === "true")
            localStorage.setItem('autoplaypreviews','true');
        else
            localStorage.setItem('autoplaypreviews','false');

        if(this.autodatausageRef.current.checked.toString() === "true")
            localStorage.setItem('datausage','Auto');
        else if(this.lowdatausageRef.current.checked.toString() === "true")
            localStorage.setItem('datausage','Low');
        else if(this.mediumdatausageRef.current.checked.toString() === "true")
            localStorage.setItem('datausage','Medium');
        else if(this.highdatausageRef.current.checked.toString() === "true")
            localStorage.setItem('datausage','High');
        else { console.log("Something went wrong during saving Data Usage Setting.") }

        localStorage.setItem('language',this.languageRef.current.options[this.languageRef.current.selectedIndex].text.toString());
        localStorage.setItem('subtitlelanguage',this.subtitlelanguageRefRef.current.options[this.subtitlelanguageRefRef.current.selectedIndex].text.toString());
        localStorage.setItem('theme',this.themeRef.current.options[this.themeRef.current.selectedIndex].text.toString());
        

        this.alertMessageRef.current.style.top = "2rem";
        this.alertMessageRef.current.innerText = "✅ Settings saved.";
        setTimeout(()=>{this.alertMessageRef.current.style.top = "-5rem";document.documentElement.className = localStorage.getItem('theme').replace(' ','');},2000);

        this.settingcomponent.current.scrollTo(0, 0);
    }

    UpdateSettingsGfx = ()=>
    {
        var m_autoPlayNextEpisode = localStorage.getItem('autoplaynextepisode');
        var m_autoPlayPreviews = localStorage.getItem('autoplaypreviews');
        var m_datausage = localStorage.getItem('datausage');
        var m_language = localStorage.getItem('language');
        var m_subtitlelanguage = localStorage.getItem('subtitlelanguage');
        var m_theme = localStorage.getItem('theme');

        if(m_autoPlayNextEpisode === 'true')
            this.autoplaynextepisodeRef.current.checked = 'true';
        else
            this.autoplaynextepisodeRef.current.checked = '';

        if(m_autoPlayPreviews === 'true')
            this.autoplaypreviewsRef.current.checked = 'true';
        else
            this.autoplaypreviewsRef.current.checked = '';

        
        this.autodatausageRef.current.checked = '';
        this.lowdatausageRef.current.checked = '';
        this.mediumdatausageRef.current.checked = '';
        this.highdatausageRef.current.checked = '';
        switch(m_datausage)
        {
            case 'Auto': this.autodatausageRef.current.checked = 'true';
                        break;
            case 'Low': this.lowdatausageRef.current.checked = 'true';
                        break;
            case 'Medium': this.mediumdatausageRef.current.checked = 'true';
                        break;
            case 'High': this.highdatausageRef.current.checked = 'true';
                        break;
            default : console.warn("Something went wront in settings for Data Usage per screen.");
        }

        for (let index = 0; index < this.languageRef.current.options.length; index++) {
            if(this.languageRef.current.options[index].text === m_language)
            {
                this.languageRef.current.selectedIndex = index;
                break;
            }
        }

        for (let index = 0; index < this.subtitlelanguageRefRef.current.options.length; index++) {
            if(this.subtitlelanguageRefRef.current.options[index].text === m_subtitlelanguage)
            {
                this.subtitlelanguageRefRef.current.selectedIndex = index;
                break;
            }
        }

        for (let index = 0; index < this.themeRef.current.options.length; index++) {
            if(this.themeRef.current.options[index].text === m_theme)
            {
                this.themeRef.current.selectedIndex = index;
                break;
            }
        }
    }
}
 
export default SettingsPage;