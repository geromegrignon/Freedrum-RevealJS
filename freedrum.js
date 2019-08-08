let bluetoothLEMidi = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
let bleMidiCharacteristic = '7772e5db-3868-4112-a1a9-f2669d106bf3';
let isAvailable = true;

var div = document.createElement('div');
div.innerHTML = '<button id="connect" style="border:none;outline:none;background:orange;border-radius:10px;padding:10px;">Connect sensors</button>';
document.querySelector('.slides section').appendChild(div);

class FreedrumStick {
  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
    this.handleData = this.handleData.bind(this);
    this.name = null;
  }
  
  request() {
    let options = {
      "filters": [
          {"name": this.name},
          {services: [bluetoothLEMidi]}
      ],
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    });
  }
    
  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.connect();
  }
  
  getFreedrumData() {
    return this.device.gatt.getPrimaryService(bluetoothLEMidi)
    .then(service => service.getCharacteristic(bleMidiCharacteristic))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
      characteristic.addEventListener('characteristicvaluechanged', this.handleData);
    })
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }

  handleData(event){
      let data = event.target.value;
      let command = data.getUint8(2);
      let note = data.getUint8(3);
      
      this.handleDrumSticksEvents(command, note); 
  }

  // API RevealJs : https://github.com/hakimel/reveal.js/#api
  handleDrumSticksEvents(command, note){
    if(isAvailable === false) {
      return;
    } else {
      if(command === 153){
        isAvailable = false;
        switch(note) {
          case 38: 
            Reveal.down();
            break;
          case 50:
           Reveal.up();
            break;
          case 41:
          case 51 :
            Reveal.right();
            break;
          case 42:
          case 57:  
           Reveal.left();
           break;
        }
        setTimeout(() =>  isAvailable = true , 300);
      }
    }
  }
}

document.querySelector('#connect').addEventListener('click', event => {
  let currentSensor = new FreedrumStick();
  currentSensor.request()
  .then(_ => currentSensor.connect())
  .then(_ => {
    currentSensor.getFreedrumData()
  })
  .catch(error => { console.log(error) });
});

