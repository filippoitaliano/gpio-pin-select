class GpioPinSelect {

  /**
   * @callback onSelectionChange
   * @param {number} selectedPin
   */

  /**
   * @param {object} props 
   * @param {string} parentNode
   * @param {onSelectionChange} props.onSelectionChange
   */
  constructor(props) {
    if (!props.parentNode) {
      throw new Error('You need to specify a parentNode to create and render a GpioPinSelect.');
    }
    this.parentNode = props.parentNode;

    this.onSelectionChange = props.onSelectionChange || console.log;
    this.mapping = props.mapping || DEFAULT_MAPPING;

    this.uuid = uuidv4();

    this.onRadioButtonChange = this.onRadioButtonChange.bind(this);

    this.render();
  }

  pinsTemplate() {
    const keys = Object.keys(this.mapping);
    const pins = [];
    let leftIndex = 0;
    let rightIndex = 20;
    let iterationIndex = 0;
    while(iterationIndex !== 40) {
      pins[iterationIndex] = { id: keys[leftIndex], name: this.mapping[keys[leftIndex]] };
      pins[iterationIndex + 1] = { id: keys[rightIndex], name: this.mapping[keys[rightIndex]] };
      leftIndex += 1;
      rightIndex += 1;
      iterationIndex += 2;
    }
    return pins.map((pin, index) => {
      if (index % 2 == 0) {
        return (`
          <div class="gpio-pin-select--first-label">${pin.name}</div>
          <div class="gpio-pin-select--radio gpio-pin-select--first-radio">
            <input type="radio" name="gpio-pin-select--gpio" id="${pin.id}" value="${pin.id}">
            <label for="${pin.id}"><span></span></label>
          </div>
        `);
      }
      return (`
        <div class="gpio-pin-select--radio gpio-pin-select--second-radio">
          <input type="radio" name="gpio-pin-select--gpio" id="${pin.id}" value="${pin.id}">
          <label for="${pin.id}"><span></span></label>
        </div>
        <div class="gpio-pin-select--second-label">${pin.name}</div>
      `);
    }).join('');
  }

  onRadioButtonChange(params) {
    this.onSelectionChange(params.target.value);
  }

  addChangeListenersToRadioButtons() {
     document.getElementById('gpio-pin-select--pins-form')['gpio-pin-select--gpio'].forEach((radio) => {
      radio.addEventListener('change', this.onRadioButtonChange);
    });
  }

  removeChangeListenersFromRadioButtons() {
    document.getElementById('gpio-pin-select--pins-form')['gpio-pin-select--gpio'].forEach((radio) => {
      radio.removeEventListener('change', this.onRadioButtonChange);
    });
  }

  render() {
    const template = `
      <div id="gpio-pin-select--${this.uuid}">
        <div class="gpio-pin-select--raspberry">
          <form id="gpio-pin-select--pins-form">
            <div class="gpio-pin-select--pins">
              ${this.pinsTemplate()}
            </div>
          </form>
        </div>
      </div>
    `;

    this.parentNode.insertAdjacentHTML('beforeend', template);

    this.addChangeListenersToRadioButtons();
  }

  destroy() {
    this.removeChangeListenersFromRadioButtons();
    document.getElementById(`gpio-pin-select--${this.uuid}`).remove();
  }

}

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const DEFAULT_MAPPING = {
  1: '3V3',
  2: 'GP2',
  3: 'GP3',
  4: 'GP4',
  5: 'GND',
  6: 'GP17',
  7: 'GP27',
  8: 'GP22',
  9: '3V3',
  10: 'GP10',
  11: 'GP9',
  12: 'GP11',
  13: 'GND',
  14: 'ID_SD',
  15: 'GP5',
  16: 'GP6',
  17: 'G13',
  18: 'GP19',
  19: 'GP26',
  20: 'GND',
  21: '5V',
  22: '5V',
  23: 'GND',
  24: 'GP14',
  25: 'GP15',
  26: 'GP18',
  27: 'GND',
  28: 'GP23',
  29: 'GP24',
  30: 'GND',
  31: 'GP25',
  32: 'GP8',
  33: 'GP7',
  34: 'ID_SC',
  35: 'GND',
  36: 'GP12',
  37: 'GND',
  38: 'GP16',
  39: 'GP20',
  40: 'GP21',
};
