import React from 'react';
import './App.css';

const sounds = [
  {
    key: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    tone: 'Heater 1'
  },
  {
    key: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    tone: 'Heater 2'
  },
  {
    key: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    tone: 'Heater 3'
  },
  {
    key: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    tone: 'Heater 4_1'
  },
  {
    key: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    tone: 'Clap'
  },
  {
    key: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    tone: 'Open HH'
  },
  {
    key: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    tone: 'Kick n\' Hat'
  },
  {
    key: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    tone: 'Kick'
  },
  {
    key: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    tone: "Closed HH"
  }
]

const DrumPad = (props) => (
  <div className="drum-pad" id={props.tone} onClick={props.onClick}>
    {props.text}
    <audio src={props.src} className="clip" id={props.text} />
  </div>
)

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentTone: ''
    };
  }
 
  
  playSound = (key) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add('click');
    console.log(parent.id);
    this.setState({
      currentTone: parent.id
    })
    audio.play();

    audio.addEventListener('ended', () => {
      parent.classList.remove('click');

    })

  }

  render(){

    return(
      <div className="App container" id="drum-machine">
        <h1>Click to play a sound</h1>
        <div className="display" id="display">
          {sounds.map((sound, i) => (
            <DrumPad 
              text={sound.key}
              key={i}
              src={sound.url}
              tone={sound.tone}
              onClick={() => this.playSound(sound.key)}
            />
          ) )}
          <h2>{this.state.currentTone}</h2>
        
        </div>

      </div>
    )
  }
}

document.addEventListener('keypress', (e) => {
  const pressed = e.key.toUpperCase();
  const audio = document.getElementById(pressed);

  if(audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    document.querySelector('h2').innerText = parent.id;
    parent.classList.add('click');
    
    audio.play();

    document.addEventListener('keyup', () => {
      parent.classList.remove('click');
    })
  }
})