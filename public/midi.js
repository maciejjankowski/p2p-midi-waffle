// var midiOut = {send : ()=>{}}
function _initMidi(){
  let beat = 0;

	if (typeof navigator.requestMIDIAccess !== 'undefined') {

	navigator.requestMIDIAccess().then(function(midiAccess){
		(function startLoggingMIDIInput( midiAccess, indexOfPort ) {
      app.midiInputPorts = [];
      app.midiOutputPorts = [];
		  midiAccess.inputs.forEach( function(entry) {
        // if (entry.name !== "CH345" ){
        console.log('entry', entry)
        app.midiInputPorts.push(entry);
        // }
      });
      let i = 0;
      midiAccess.outputs.forEach((entry)=>{
        console.log(entry.name);
        if (entry.name.indexOf("USB2.0-MIDI") > -1 || entry.name.indexOf('DRC') > -1){
          app.setOutputMidiPort(i);
          send('receiver');
        }
        i++;
      
        
        app.midiOutputPorts.push(entry);
        // console.log(entry);
      })
		})(midiAccess);
    
    
	}); // then
    
  } else {
    app.error = "no midi"
  }
  
}
