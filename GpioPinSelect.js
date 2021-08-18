class GpioPinSelect {

  /**
   * @callback onSelectionChange
   * @param {number} selectedPin
   */

  /**
   * @param {object} props 
   * @param {string} wrapperNode
   * @param {onSelectionChange} props.onSelectionChange
   */
  constructor(props) {
    if (!props.wrapperNode) {
      throw new Error('You need to specify a wrapperNode to create and render a GpioPinSelect.');
    }
    this.wrapperNode = props.wrapperNode;
    this.onSelectionChange = props.onSelectionChange;
  }

  renderPinsWithLabel() {
    return `
      <div class="gpio-pin-select--first-label">a</div>
      <div class="gpio-pin-select--first-radio">
        <input type="radio" name="gpio-pin-select--gpio" id="0" value="0" checked>
      </div>
      <div class="gpio-pin-select--second-radio">
        <input type="radio" name="gpio-pin-select--gpio" id="1" value="1">
      </div>
      <div class="gpio-pin-select--second-label">d</div>
    `;
  }

  render() {
    const template = `
      <div class="gpio-pin-select--raspberry">
        <div class="gpio-pin-select--pins">
          ${this.renderPinsWithLabel()}
        </div>
      </div>
    `;

    this.wrapperNode.insertAdjacentHTML('beforeend', template);
  }

  updateValue() {

  }

  destroy() {

  }

}
