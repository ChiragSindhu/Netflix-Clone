import React, { Component } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import './index.css';

import movieLoaderGIF from '../../gif/loadingVideoPlayer.gif';
import moviePlayReady from '../../gif/playButtonReady.gif';

import fullScreenICON from '../../icon/fullscreen.png';
import playICON from '../../icon/play.png';
import pauseICON from '../../icon/pause.png';
import tenICON from '../../icon/ten.png';
import ten2ICON from '../../icon/ten2.png';
import videoSettings from '../../icon/settingsVideo.png';

import playbackSpeedICON from '../../icon/playbackSpeed.png';
import videoQualityICON from '../../icon/videoQuality.png';
import audioQualityICON from '../../icon/audioQuality.png';
import subtitleICON from '../../icon/closedCaption.png';
import rightSetting from '../../icon/rightSetting.png';
import checkICON from "../../icon/check.png";
import volumeF from "../../icon/volumeF.png";

class Player extends Component{
    constructor(){
        super();

        this.state = {
            mouseIdleTime: 0,

            playbackSpeed: 1,
            videoQuality: 0,
            audioValue: "",
            subtitleValue: "Off",
            
            videoSRC:"",
            subtitleSRC:"",
            bufferedRange: [],
            volume: 1,

            isOnVolumeSlider: false,
            isOnPlaybackSlider: false,
            changedVideoTime: 0,
            changedQuality: false,
            MouseOnBottomContainer: false,

            volumeAmplifier: 0
        }

        this.Player = React.createRef();
        this.loadingPlayerGIF = React.createRef();
        this.moviePlayGIF = React.createRef();
        this.topHeadingControl = React.createRef();
        this.movieProgressBar = React.createRef();
        this.movieProgressBarCicle = React.createRef();
        this.movieProgressBarNumber = React.createRef();
        this.mainMoviePlayerContainer = React.createRef();
        this.bottomContainer = React.createRef();
        this.playIcon = React.createRef();
        this.pauseIcon = React.createRef();
        this.centerComponentRef = React.createRef();
        this.errorSection = React.createRef();
        this.movieDetailComponent = React.createRef();
        this.settingsTab = React.createRef();
        this.videoQualityTab = React.createRef();
        this.playbackSpeedTab = React.createRef();
        this.subtitleTab = React.createRef();
        this.audioTrackTab = React.createRef();
        this.SettingICON = React.createRef();
        this.volumeElement = React.createRef();
        this.VolumeElementValue = React.createRef();
        this.volumeUserHelperText = React.createRef();
        this.progressBarBackground = React.createRef();
        this.middleTopText = React.createRef();
    }

    componentDidMount(){
        document.title = "Movie";

        this.setState({bufferedRange : []});

        ////////////////////////////////Change them to user default
        //console.log('Video', this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]][Object.keys(this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]])[0]]);
        //console.log('Audio', Object.keys(this.props.location.state.WatchUrl)[0]);
        //console.log(Object.keys(this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]])[0]);
        this.setState({ videoSRC: this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]][Object.keys(this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]])[0]] });
        this.setState({ videoQuality: Object.keys(this.props.location.state.WatchUrl[Object.keys(this.props.location.state.WatchUrl)[0]])[0] });
        this.setState({ audioValue: Object.keys(this.props.location.state.WatchUrl)[0] });

        //console.log(this.props.location.state);
        //console.log(this.Player.current.audioTracks);

        this.topHeadingControl.current.style.display = "none";
        this.pauseIcon.current.style.display = "none";
        this.settingsTab.current.style.display = "none";
        this.videoQualityTab.current.style.display = "none";
        this.playbackSpeedTab.current.style.display = "none";
        this.subtitleTab.current.style.display = "none";
        this.audioTrackTab.current.style.display = "none";
        this.volumeElement.current.className = "hideLeft";
        //this.bottomContainer.current.style.opacity = "0";
        //this.bottomContainer.current.style.pointerEvents = "none";
        this.volumeUserHelperText.current.style.opacity = "0";
        this.movieProgressBarCicle.current.style.opacity = "0";
        this.middleTopTextHide();

        //this.bottomContainer.current.style.display = "none";
        //this.movieProgressBarCicle.current.style.opacity = "0";
    }

    loadStart = () => {
        this.loadingPlayerGIF.current.style.display = "block";
        this.moviePlayGIF.current.style.display = "none";
        this.errorSection.current.style.display = "none";
        console.log("Loading...");
       
        if(this.state.changedQuality)
        {
            this.Player.current.className = "blurBrightness";
            this.Player.current.currentTime = this.state.changedVideoTime;
            this.setState({changedQuality: false});
            this.Player.current.play();
            setTimeout(()=>{this.showSelectedSubtitle(this.state.subtitleValue);},1000)
        }
    }

    loadedData = () => {
        this.loadingPlayerGIF.current.style.display = "none";
        this.moviePlayGIF.current.style.display = "block";    

        console.log("Movie loaded.");  
    }

    playMovie = () => {
        this.moviePlayGIF.current.style.display = "none";
        this.Player.current.className = "playerPlaying";
        this.bottomContainer.current.style.opacity = "1";
        this.bottomContainer.current.style.pointerEvents = "auto";
    
        this.topHeadingControl.current.style.display = "block";
        this.bottomContainer.current.style.display = "block";
        
        if(this.state.volumeAmplifier === 0)
            this.setState({volumeAmplifier: this.amplifyMedia(this.Player.current, 2)});

        this.Player.current.play();

        this.updatePlayPauseIconSetting();

        //Make fullscreen when movie play
        //this.handleFullScreenProperty();

        this.getMovieStats();

        setInterval(() => {
            this.incrementMouseIdleTime();
        }, 1000);
    }

    mouseMove = () => {
        this.setState({ mouseIdleTime: 0 });
        this.topHeadingControl.current.className = "mouseHoverNameBegin";
        this.bottomContainer.current.style.bottom = "0px";
    }

    incrementMouseIdleTime = () => {

        if(this.state.MouseOnBottomContainer === true) return;

        this.setState(prevState => {
            return { mouseIdleTime: prevState.mouseIdleTime + 1}
        });

        if(this.state.mouseIdleTime >= 2){
            if(this.topHeadingControl.current !== null){
                this.topHeadingControl.current.className = "mouseHoverNameEnd";
                this.bottomContainer.current.style.bottom = "-75px";
                this.hideSettingsTab();
            }
        }
    }

    getMovieStats = () => {
        this.loadingPlayerGIF.current.style.display = "none";
        this.moviePlayGIF.current.style.display = "none";

        this.updatePlayPauseIconSetting();
    }

    handleProgressBarOver = (event) => {
        if(!this.state.isOnPlaybackSlider)
            return

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;

        var width = getComputedStyle(event.target).width;
        width = width.split('p')[0];

        //console.log(x , width);
        var percent = (x / width);
        
        var currentTime = this.Player.current.duration * percent
        this.Player.current.currentTime = currentTime;

        this.updateMoviePlayer();
        this.updatePlayPauseIconSetting();
    }

    handleProgressBarClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;

        var width = getComputedStyle(event.target).width;
        width = width.split('p')[0];

        //console.log(x , width);
        var percent = (x / width);
        
        var currentTime = this.Player.current.duration * percent
        this.Player.current.currentTime = currentTime;

        this.updateMoviePlayer();
        this.updatePlayPauseIconSetting();
    }

    handleVolumeBarSeek = (event) => {
        //console.log(this.state.isOnVolumeSlider);

        if(this.state.isOnVolumeSlider === false) return;
        
        const rect = event.target.getBoundingClientRect();
        const x = Math.floor(event.clientX - rect.left);

        if(x > 100) return;

        this.VolumeElementValue.current.style.width = x + "%";
        this.setState({ volume: x / 100 });

        this.volumeUserHelperText.current.innerText = x * 2 + "%";
        if(x <= 90)
            this.volumeUserHelperText.current.style.color = "white";
        else
            this.volumeUserHelperText.current.style.color = "#B22B27";
        //console.log(x);
    }

    updateMoviePlayer = () => {
        const currentPassedSeconds = this.Player.current.currentTime;
        const totalMovieLength = this.Player.current.duration;
        const percentageCompleted = (currentPassedSeconds / totalMovieLength) * 94;

        const remainingHour = Math.floor((totalMovieLength - currentPassedSeconds) / 3600);

        var remainingMinute = Math.floor((totalMovieLength - currentPassedSeconds) / 60) - remainingHour * 60;
        remainingMinute = remainingMinute > 9 ? remainingMinute : "0" + remainingMinute;

        var remainingSeconds = Math.floor((totalMovieLength - currentPassedSeconds) % 60);
        remainingSeconds = remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds;

        this.movieProgressBar.current.style.width = percentageCompleted + "%"; 
        this.movieProgressBarCicle.current.style.left = this.movieProgressBar.current.getBoundingClientRect().right + "px";
        
        if(remainingHour > 0){
            this.movieProgressBarNumber.current.innerHTML = remainingHour + ":" + remainingMinute + ":" + remainingSeconds;
        }else{
            this.movieProgressBarNumber.current.innerHTML = remainingMinute + ":" + remainingSeconds;
        }

        if(this.state.isOnPlaybackSlider){
            const totalHour = Math.floor((totalMovieLength) / 3600);
            var totalMinute = Math.floor((totalMovieLength) / 60) - totalHour * 60;
            totalMinute = totalMinute > 9 ? totalMinute : "0" + totalMinute;
            var totalSeconds = Math.floor((totalMovieLength) % 60);
            totalSeconds = totalSeconds > 9 ? totalSeconds : "0" + totalSeconds;

            if(totalHour <= 0){
                this.middleTopTextSetText(remainingMinute + ":" + remainingSeconds + "/" + totalMinute + ":" + totalSeconds);
            }else{
                this.middleTopTextSetText(remainingHour + ":" + remainingMinute + ":" + remainingSeconds + "/" + totalHour + ":" + totalMinute + ":" + totalSeconds);
            }
        }
        this.setState({ bufferedRange: this.Player.current.buffered });

        //console.log(this.Player.current.readyState);
 
        //console.log(remainingMinute + " : " + remainingSeconds);   
        //console.log(percentageCompleted + "%");   
    }

    handleBuffering = () => {
        this.loadingPlayerGIF.current.style.display = "block";
        this.moviePlayGIF.current.style.display = "none";

        setTimeout(() => {
            //console.log(this.Player.current.readyState);
            if(this.Player.current.readyState === 0 || this.Player.current.readyState === 1 || this.Player.current.readyState === 2)
            {
                this.centerComponentRef.current.style.display = "flex";
                this.Player.current.className = "blurBrightness";
            }
        }, 1000);
    }

    handleUpperMouseEnter = () => {
        this.movieProgressBarCicle.current.style.opacity = "1";
    }

    handleUpperMouseLeave = () => {
        this.movieProgressBarCicle.current.style.opacity = "0";
        this.setState({isOnPlaybackSlider:false});
        this.progressBarBackground.current.style.height = "3px";
        this.movieProgressBar.current.style.height = "3px";
        this.middleTopTextHide();
    }

    getBufferedTimeRangeHTML = () => {
        if(this.Player.current === null)
            return;

        let content = [];
        for (let index = 0; index < this.Player.current.buffered.length; index++) {
            const widthVal = 94 * ((this.Player.current.buffered.end(index) - this.Player.current.buffered.start(index)) / this.Player.current.duration);
            const leftVal = 94 * (this.Player.current.buffered.start(index) / this.Player.current.duration);

            content.push(
                <div key={index} className="bufferedLength" style={{height: this.state.isOnPlaybackSlider === true ? "7px" : "3px",width: widthVal + "%", marginLeft: leftVal + "%"}}></div>
            );
        }

        return content;
    }

    handleFullScreenProperty = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
        {
            console.log("Exit");
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }else {
            console.log("Enter Full screen");
            if (this.mainMoviePlayerContainer.current.requestFullscreen) {
                this.mainMoviePlayerContainer.current.requestFullscreen();
            } else if (this.mainMoviePlayerContainer.current.webkitRequestFullscreen) { /* Safari */
                this.mainMoviePlayerContainer.current.webkitRequestFullscreen();
            } else if (this.mainMoviePlayerContainer.current.msRequestFullscreen) { /* IE11 */
                this.mainMoviePlayerContainer.current.msRequestFullscreen();
            }
        }
    }

    resumeMovie = () => {
        if(this.Player.current.readyState === 0 || this.Player.current.readyState === 1 || this.Player.current.readyState === 2) return;

        this.Player.current.play();
        this.updatePlayPauseIconSetting();
    }

    pauseMovie = () => {
        this.Player.current.pause();
        this.updatePlayPauseIconSetting();
    }

    updatePlayPauseIconSetting = () => {
        if(this.Player.current.paused){
            this.playIcon.current.style.display = "block";
            this.pauseIcon.current.style.display = "none";          

            setTimeout(() => {
                if(this.Player.current.paused){
                    this.centerComponentRef.current.style.display = "flex";
                    this.Player.current.className = "blurBrightness";
                }
            }, 3000);
        }else{
            this.pauseIcon.current.style.display = "block";
            this.playIcon.current.style.display = "none";

            this.centerComponentRef.current.style.display = "none";
            this.Player.current.className = "playerPlaying";
        }
    }

    forwardCurrentTime = () => {
        var currentTime = this.Player.current.currentTime + 10;
        this.Player.current.currentTime = currentTime;

        this.updateMoviePlayer();
    }

    backwardCurrentTime = () => {
        var currentTime = this.Player.current.currentTime - 10;
        this.Player.current.currentTime = currentTime;

        this.updateMoviePlayer();
    }

    handleError = () => {
        console.log("Oops. Something went wrong!");

        this.loadingPlayerGIF.current.style.display = "none";
        this.moviePlayGIF.current.style.display = "none";

        this.errorSection.current.style.display = "block";
        this.Player.current.className = "blurBrightness";
    }

    handleVideoQualitySettings = () => {
        try{
            return(
            Object.keys(this.props.location.state.WatchUrl[this.state.audioValue]).map((item,index) => (
                <div key={index} id={"videoQualityNumber" + index} className="videoQualityNumber" onClick={this.handleChangeVideoQuality}>
                    {parseInt(item) === parseInt(this.state.videoQuality) ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                    {item}p
                </div>
            )));
        } catch(qualityError){ console.warn("QualityError:" , qualityError.message)}
    }

    handleChangeVideoQuality = (event) => {
        // Format will be e.g 360p and replacing p with '' then int will be 360
        const Quality = parseInt(event.target.innerText.replace('p',''));
        const VideoSrc = this.props.location.state.WatchUrl[this.state.audioValue][Quality];

        //console.log(Quality, VideoSrc);

        if(this.state.videoQuality !== Quality || this.state.videoSRC.length === 0)
        {
            this.hideAllSubtitle();
            this.showVideoQualityTab();
            this.setState({ changedQuality:true, changedVideoTime: this.Player.current.currentTime});
            this.setState({videoQuality: Quality, videoSRC: VideoSrc});
        }
    }

    handleChangePlaybackSpeed = (event) => {
        // Format will be e.g 1x and replacing x with '' then float will be 1
        const Speed = parseFloat(event.target.innerText.replace('x',''));
        //console.log(Speed + "x Event Occured");

        if(this.Player.current.playbackRate !== Speed)
        {
            //console.log("change speed from " + this.Player.current.playbackRate + "x to " + Speed + "x");
            this.Player.current.playbackRate = Speed;
            this.setState({playbackSpeed:Speed});
        }
    }

    showSettingsTab = () => {
        if(this.settingsTab.current.style.display === "flex"){
            this.hideSettingsTab();
        }else{
            this.settingsTab.current.style.display = "flex";
            this.videoQualityTab.current.style.display = "none";
            this.playbackSpeedTab.current.style.display = "none";
            this.audioTrackTab.current.style.display = "none";
            this.subtitleTab.current.style.display = "none";

            this.SettingICON.current.id = "rotateSettingClass";
        }
    }

    hideSettingsTab = () => {
        if(this.settingsTab.current.style.display === "flex"){
            this.SettingICON.current.id = "bottomICON";
            this.settingsTab.current.style.display = "none";
        }
        
        if(this.videoQualityTab.current.style.display === "flex"){
            this.videoQualityTab.current.style.display = "none";
        }

        if(this.playbackSpeedTab.current.style.display === "flex"){
            this.playbackSpeedTab.current.style.display = "none";
        }

        if(this.audioTrackTab.current.style.display === "flex"){
            this.audioTrackTab.current.style.display = "none";
        }

        if(this.subtitleTab.current.style.display === "flex"){
            this.subtitleTab.current.style.display = "none";
        }
    }

    showVideoQualityTab = () => {
        if(this.videoQualityTab.current.style.display === "flex"){
            this.videoQualityTab.current.style.display = "none";
        }else{
            this.settingsTab.current.style.display = "none";
            this.SettingICON.current.id = "bottomICON";
            this.videoQualityTab.current.style.display = "flex";
        }
    }

    showPlaybackSpeedTab = () => {
        if(this.playbackSpeedTab.current.style.display === "flex"){
            this.playbackSpeedTab.current.style.display = "none";
        }else{
            this.settingsTab.current.style.display = "none";
            this.SettingICON.current.id = "bottomICON";
            this.playbackSpeedTab.current.style.display = "flex";
        }
    }

    showAudioTab = () => {
        if(this.audioTrackTab.current.style.display === "flex"){
            this.audioTrackTab.current.style.display = "none";
        }else{
            this.settingsTab.current.style.display = "none";
            this.SettingICON.current.id = "bottomICON";
            this.audioTrackTab.current.style.display = "flex";
        }
    }

    showSubtitleTab = () => {
        if(this.subtitleTab.current.style.display === "flex"){
            this.subtitleTab.current.style.display = "none";
        }else{
            this.settingsTab.current.style.display = "none";
            this.SettingICON.current.id = "bottomICON";
            this.subtitleTab.current.style.display = "flex";
        }
    }

    handleSubtitleSettings = () => {
        return(
        Object.keys(this.props.location.state.Subtitles).map((item,index) => (
            <div key={index} id={"videoQualityNumber" + index} className="videoQualityNumber" onClick={this.handleChangeSubtitleValue}>
                {item === this.state.subtitleValue ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                {item}
            </div>
        )));
    }

    handleChangeSubtitleValue = (event) => {
        const Subtitle = event.target.innerText.toString();

        this.setState({subtitleValue:Subtitle});

        if(Subtitle === "Off")
        {
            this.setState({subtitleSRC:""});
            this.hideAllSubtitle();
            
            return;
        }

        const subtitleSRC = this.props.location.state.Subtitles[Subtitle];

        if(this.state.subtitleValue !== Subtitle)
        {
            this.setState({subtitleSRC});
            this.showSelectedSubtitle(Subtitle);
        }
    }

    showSelectedSubtitle = (Subtitle) => {
        for(const tracks of this.Player.current.textTracks)
        {
            if(tracks.label === Subtitle)
                tracks.mode = "showing";
            else
                tracks.mode = "disabled";
        }
    }

    hideAllSubtitle = () => {
        for(const tracks of this.Player.current.textTracks)
        {
            tracks.mode = "disabled";
        }
    }

    handleAudioSettings = () => {
        return(
        Object.keys(this.props.location.state.WatchUrl).map((item,index) => (
            <div key={index} id={"videoQualityNumber" + index} className="videoQualityNumber" onClick={this.handleChangeAudioValue}>
                {item === this.state.audioValue ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                {item}
            </div>
        )));
    }

    handleChangeAudioValue = (event) => {
        const Audio = event.target.innerText.toString();

        this.setState({audioValue: Audio});

        const videoSRC = this.props.location.state.WatchUrl[Audio][this.state.videoQuality];

        //console.log(Audio, videoSRC);

        if(this.state.audioValue !== Audio)
        {
            this.hideAllSubtitle();
            this.setState({videoSRC});
            this.setState({ changedQuality:true, changedVideoTime: this.Player.current.currentTime});
            this.showAudioTab();
        }
    }

    handleRateChange = () => {
        console.log(this.Player.current.defaultPlaybackRate);
    }

    amplifyMedia(mediaElem, multiplier){
        var context = (new window.AudioContext() || new window.webkitAudioContext()),
            result = {
                context: context,
                source: context.createMediaElementSource(mediaElem),
                gain: context.createGain(),
                media: mediaElem,
                amplify: function(multiplier) { result.gain.gain.value = multiplier; },
                getAmpLevel: function() { return result.gain.gain.value; }
            };
        result.source.connect(result.gain);
        result.gain.connect(context.destination);
        result.amplify(multiplier);

        return result;
    }

    showVolumeBar = () => {
        this.volumeElement.current.className = "showLeft";
    }

    hideVolumeBar = () => {
        this.volumeElement.current.className = "hideLeft";
    }

    completeVolumeUserInput = () => {
        this.volumeElement.current.style.height = "4.5px";
        try{
            if(this.state.isOnVolumeSlider === true)
            {
            // console.log("Volume " + this.state.volume * 200 + "%");
                var stateVolume = this.state.volume * 2;
                if(stateVolume <= 1)
                {
                    this.state.volumeAmplifier.amplify(2);
                    this.Player.current.volume = stateVolume / 2;
                }else
                {
                    this.state.volumeAmplifier.amplify(stateVolume * 2);
                    this.Player.current.volume = 1;
                }
            }
        }catch(volumeErr) {console.warn("VolumeErr: " + volumeErr.message); this.setState({volumeAmplifier: this.amplifyMedia(this.Player.current, this.state.volume * 4)});}

        this.setState({isOnVolumeSlider: false});
        setTimeout(()=>{this.volumeUserHelperText.current.style.opacity = 0;},200);
    }

    TextTracksDynamically = () => {
        return(
        Object.keys(this.props.location.state.Subtitles).map((item,index) => (
            <track key={item+index} src={"http://localhost:5000/getSubtitles?subtitleName=" + this.props.location.state.Subtitles[item]} label={item} kind="subtitles" />
        )));
    }

    middleTopTextShow = () => {
        this.middleTopText.current.style.opacity = "1";
    }

    middleTopTextHide = () => {
        this.middleTopText.current.style.opacity = "0";
    }

    middleTopTextSetText = (text) => {
        this.middleTopText.current.innerText = text;
    }

    render(){
        return(
            <div className='playerContainer' ref={this.mainMoviePlayerContainer}>
                <div id='topHeading' ref={this.topHeadingControl} onClick={this.hideSettingsTab}>{this.props.location.state.Name} { this.props.location.state.Year } </div>

                <div id="centerComponent" ref={this.centerComponentRef} onClick={this.hideSettingsTab}>
                    <div id="movieDetails" ref={this.movieDetailComponent}>
                        <div id="movieDetail1">
                            {this.props.location.state.Name}
                        </div>
                        <div id="movieDetail2">
                            {this.props.location.state.Time} &#8226; {this.props.location.state.Release} &#8226; {this.props.location.state.Rating} &#11088;
                        </div>
                        <div id="movieDetail3">
                            {this.props.location.state.Synopsis}
                        </div>
                    </div>
                    <img id="movieLoaderGif" ref={this.loadingPlayerGIF} src={movieLoaderGIF} alt=''/>
                    <img onClick={this.playMovie} id="moviePlayGif" ref={this.moviePlayGIF} src={moviePlayReady} alt=''/>
                    <div ref={this.errorSection} id="errorSection">Oops! Something went wrong :(</div>
                </div>

                <div id='settingsTab' ref={this.settingsTab} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}}>
                    <div className="Setting" onClick={this.showPlaybackSpeedTab}>
                        <img id="settingICONS" src={playbackSpeedICON} alt="" />
                        <div id="settingHeading">Playback Speed</div>
                        <div id="settingsValue">{this.state.playbackSpeed}x</div>
                        <img id="settingrightICONS" src={rightSetting} alt="" />
                    </div>
                    <div className="Setting" onClick={this.showVideoQualityTab}>
                        <img id="settingICONS" src={videoQualityICON} alt="" />
                        <div id="settingHeading">Video Quality</div>
                        <div id="settingsValue">{this.state.videoQuality}p</div>
                        <img id="settingrightICONS" src={rightSetting} alt="" />
                    </div>
                    <div className="Setting" onClick={this.showAudioTab}>
                        <img id="settingICONS" src={audioQualityICON} alt="" />
                        <div id="settingHeading">Audio</div>
                        <div id="settingsValue">{this.state.audioValue}</div>
                        <img id="settingrightICONS" src={rightSetting} alt="" />
                    </div>
                    <div className="Setting" onClick={this.showSubtitleTab}>
                        <img id="settingICONS" src={subtitleICON} alt="" />
                        <div id="settingHeading">Subtitle</div>
                        <div id="settingsValue">{this.state.subtitleValue}</div>
                        <img id="settingrightICONS" src={rightSetting} alt="" />
                    </div>
                </div>

                <div id="playbackSpeedTab" ref={this.playbackSpeedTab} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}}>
                    <div id="headingVideoQuality">
                        <img id="settingleftICONS" onClick={this.showSettingsTab} src={rightSetting} alt="" />
                        <div id="settinsVideoValue">Change Speed</div>
                    </div>
                    <div id="videoQualities">
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {0.50 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            0.50x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {0.75 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            0.75x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {1 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            1x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {1.25 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            1.25x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {1.50 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            1.50x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {1.75 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            1.75x
                        </div>
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangePlaybackSpeed}>
                            {2 === this.state.playbackSpeed ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            2x
                        </div>
                    </div>
                </div>

                <div id="videoQualityTab" ref={this.videoQualityTab} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}}>
                    <div id="headingVideoQuality">
                        <img id="settingleftICONS" onClick={this.showSettingsTab} src={rightSetting} alt="" />
                        <div id="settinsVideoValue">Change Quality</div>
                    </div>
                    <div id="videoQualities">
                        { this.handleVideoQualitySettings() }
                    </div>
                </div>

                <div id="audioQualityTab" ref={this.audioTrackTab} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}}>
                    <div id="headingVideoQuality">
                        <img id="settingleftICONS" onClick={this.showSettingsTab} src={rightSetting} alt="" />
                        <div id="settinsVideoValue">Audio Tracks</div>
                    </div>
                    <div id="videoQualities">
                        { this.handleAudioSettings() }
                    </div>
                </div>

                <div id="subtitleTab" ref={this.subtitleTab} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}}>
                    <div id="headingVideoQuality">
                        <img id="settingleftICONS" onClick={this.showSettingsTab} src={rightSetting} alt="" />
                        <div id="settinsVideoValue">Subtitles</div>
                    </div>
                    <div id="videoQualities">
                        <div id="videoQualityNumber" className="videoQualityNumber" onClick={this.handleChangeSubtitleValue}>
                            {"Off" === this.state.subtitleValue ? <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "1"}} src={checkICON} alt=''/> : <img width="20px" height="20px" style={{margin: "0px 15px 0px 0px", opacity: "0"}} src={checkICON} alt=''/>}
                            Off
                        </div>
                        { this.handleSubtitleSettings() }
                    </div>
                </div>

                <div id="bottomContainer" ref={this.bottomContainer} onMouseLeave={()=>{this.setState({MouseOnBottomContainer:false})}} onMouseEnter={()=>{this.setState({MouseOnBottomContainer:true})}} >
                    <div id="upperContainer" onMouseEnter={this.handleUpperMouseEnter} onMouseDown={()=>{this.setState({isOnPlaybackSlider:true}); this.middleTopTextShow(); this.movieProgressBarCicle.current.style.opacity = "0"; this.progressBarBackground.current.style.height = "7px"; this.movieProgressBar.current.style.height = "7px"}} onMouseUp={()=>{this.setState({isOnPlaybackSlider:false}); this.middleTopTextHide(); this.movieProgressBarCicle.current.style.opacity = "1"; this.progressBarBackground.current.style.height = "3px"; this.movieProgressBar.current.style.height = "3px"}} onMouseLeave={this.handleUpperMouseLeave}>
                        <div ref={this.progressBarBackground} id="progressBarBackground" onClick={this.handleProgressBarClick} onMouseMove={this.handleProgressBarOver} >
                            { this.getBufferedTimeRangeHTML() }
                            <div ref={this.movieProgressBar} id="progressBar"></div>
                        </div>
                        <div ref={this.movieProgressBarNumber} id="progressBarNumber">0:00</div>
                    </div>
                    <div id="secondUpperContainer" onMouseLeave={this.hideVolumeBar}>
                        <img ref={this.playIcon} alt="" src={playICON} id="bottomICON" onClick={this.resumeMovie}/>
                        <img ref={this.pauseIcon} alt="" src={pauseICON} id="bottomICON" onClick={this.pauseMovie}/>
                        <img alt="" src={ten2ICON} id="bottomICON" onClick={this.backwardCurrentTime}/>
                        <img alt="" src={tenICON} id="bottomICON" onClick={this.forwardCurrentTime}/>
                        <img alt="" src={volumeF} id="bottomICON" onMouseEnter={this.showVolumeBar}/>
                        <div ref={this.volumeElement} id="volumeBar"><div id="volumeBarBackground" onMouseDown={()=>{this.volumeElement.current.style.height = "8.5px"; this.volumeUserHelperText.current.style.opacity = 1; this.setState({isOnVolumeSlider: true})}} onMouseUp={this.completeVolumeUserInput} onMouseLeave={this.completeVolumeUserInput} onMouseMove={this.handleVolumeBarSeek}><div ref={this.VolumeElementValue} id="volumeBarCurrentValue"></div></div></div>
                        <div id="secondUpperContainerDivider"></div>
                        <img alt="" ref={this.SettingICON} id="bottomICON" src={videoSettings} onClick={this.showSettingsTab}/>
                        <img alt="" src={fullScreenICON} id="bottomICON" onClick={this.handleFullScreenProperty}/>
                    </div>
                </div>

                <div ref={this.movieProgressBarCicle} id="progressBarCircle"></div>
                <div ref={this.volumeUserHelperText} id="volumeUserHelperText">100%</div>
                <div ref={this.middleTopText} style={{color: "white",fontSize: "4em",zIndex: 2,transition: "0.2s", position: "absolute", top: "5vh", left: "50%", transform:"translate(-50%, 0)"}}></div>

                <ReactHlsPlayer
                    crossOrigin="anonymous"
                    playerRef={this.Player}
                    id='player'
                    className='playerStop'
                    controls={false}
                    preload="auto"
                    onLoadStart={this.loadStart}
                    onCanPlay={this.loadedData}

                    onPlaying={this.getMovieStats}
                    onTimeUpdate={this.updateMoviePlayer}
                    onRateChange={this.handleRateChange}

                    poster={this.props.location.state.Banner}
                    onMouseMove={this.mouseMove}
                    onWaiting={this.handleBuffering}
                    onStalled={this.handleBuffering}

                    onError={this.handleError}
                    onClick={this.hideSettingsTab}

                    src= {this.state.videoSRC} 
                >
                    {this.TextTracksDynamically()}
                </ReactHlsPlayer>
            </div>
        )
    }
}

export default Player;