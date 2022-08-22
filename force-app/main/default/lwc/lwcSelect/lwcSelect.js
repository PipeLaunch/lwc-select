/**
 * @description       : Generic select component since lightning combobox has limitations on mobile/overflow elements
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 22-08-2022
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 24-07-2022 - Initial version
 **/
import { LightningElement, api, track } from "lwc";

import * as utils from "./lwcSelectUtils";
import * as styling from "./lwcSelectStyling";

export default class LwcSelect extends LightningElement {
  @api debug = false; // set to true to see debug messages on console
  @api label = ""; // text label (enable variant to display the label)
  @api fieldLevelHelp = ""; // help text
  @api name = "lwc-select"; // name of the field
  @api propagateEvents = false;

  /**
   * @description use a guid to unique identify each modal.
   * If none value is provided, a guid will be generated
   * @default random guid
   */
  @api get guid() {
    return this._guid;
  }
  _guid = utils.generateGuid();
  set guid(value) {
    this._guid = utils.validateString(value);
  }

  /**
   * @description The variant changes the appearance of an input field
   * @default "label-hidden"
   */
  @api
  get variant() {
    return this._variant;
  }
  _variant = "label-hidden";
  set variant(value) {
    this._variant = utils.validateVariant(value);
  }

  @api
  get options() {
    return this._options;
  }
  _options = null; // original list of options
  set options(value) {
    const isValidOptions = utils.validateOptions(value);
    if (isValidOptions) {
      this._options = utils.processOptions(value, this._value);
    } else {
      this._options = null;
    }
  }

  /**
   * @description pre selected value
   */
  @api
  get value() {
    return this.template.querySelector("select").value;
    // return this._value;
  }
  _value = null;
  set value(value) {
    this._value = value;
    this._options = utils.processOptions(this._options, value);
  }

  /**
   * @description If present, the controller is read-only. A read-only controller is also disabled.
   * @default false
   */
  @api
  get readOnly() {
    return this._readOnly;
  }
  set readOnly(value) {
    this._readOnly = utils.normalizeBoolean(value);
    this._disabled = this._readOnly;
  }

  /**
   * @description multiselection enabled
   * @default false
   */
  @api
  get multiple() {
    return this._multiple;
  }
  _multiple = false;
  set multiple(value) {
    this._multiple = utils.normalizeBoolean(value);
  }

  /**
   * @description disabled state. A disabled controller is also read-only.
   * @default false
   */
  @api
  get disabled() {
    return this._disabled;
  }
  _disabled = false;
  set disabled(value) {
    this._disabled = utils.normalizeBoolean(value);
  }

  @api
  get required() {
    return this._required;
  }
  _required = false;
  set required(value) {
    this._required = utils.normalizeBoolean(value);
  }

  @track displayOptions = []; // list of options to display in the list

  @track status = {
    errors: undefined,
  };

  /**
   * @type {String}
   */
  get computeLabelClass() {
    return styling.computeLabelClass(this._variant);
  }

  get computeFormElementClasses() {
    // TODO: check if element has errors
    return styling.computeFormElementClasses(this._variant, this.status.errors);
  }

  /**
   * @description
   */
  @api
  get selectedValue() {
    return this.template.querySelector("select").value();
  }

  /**
   * @description Removes focus from the combobox.
   */
  @api blur() {
    this.template.querySelector("select").blur();
  }

  /**
   * @description Sets focus on the combobox.
   */
  @api focus() {
    this.template.querySelector("select").focus();
  }

  /**
   * @description Returns the valid attribute value (Boolean) on the ValidityState object.
   */
  @api checkValidity() {
    // https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/
    return this.template.querySelector("select").checkValidity();
  }

  /**
   * @description Returns the valid attribute value (Boolean) on the ValidityState object.
   */
  @api reportValidity() {
    return this.template.querySelector("select").reportValidity();
  }

  handleChange(evt) {
    const newValue = evt.target.value;
    this.value = newValue;
    this._dispatchEvent("change", { detail: this._value });
    if (this.reportValidity()) {
      this.status.errors = undefined;
    }
    if (this.debug) {
      console.info("Value changed to", newValue);
    }
  }

  handleInvalid(evt) {
    this.status.errors = evt.target.validationMessage;
  }

  // NOT SUPPORTED YET
  // @api setCustomValidity(message) {
  // @api showHelpMessageIfInvalid() {

  /**
   * @description dispatch an event to the parent
   * @param {String} eventName
   */
  _dispatchEvent(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        composed: this.propagateEvents,
        bubbles: this.propagateEvents,
      })
    );
  }
}
