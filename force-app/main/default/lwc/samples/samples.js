/**
 * @description       : Sample usage of the custom component
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 22-08-2022
 * @last modified by  : samuel@pipelaunch.com
 **/

import { ShowToastEvent } from "lightning/platformShowToastEvent";

import { LightningElement } from "lwc";

export default class Samples extends LightningElement {
  options1 = [
    {
      label: "Select...",
      value: "none",
    },
    {
      label: "Option 1",
      value: "option1",
    },
    {
      label: "Option 2",
      value: "option2",
    },
    {
      label: "Option 3",
      value: "option3",
    },
  ];

  options2 = [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
    {
      label: "C",
      value: "C",
    },
  ];

  handleClickValidate() {
    const elm = this.template.querySelector(
      'c-lwc-select[data-selector="no-options"]'
    );
    elm.checkValidity();
  }

  handleClickGetValue() {
    const elm = this.template.querySelector(
      'c-lwc-select[data-selector="pre-selected"]'
    );
    const value = elm.value;
    console.log(`Selected value: ${value}`);
    const event = new ShowToastEvent({
      title: "Success",
      message: `Selected value: ${value}`,
    });
    this.dispatchEvent(event);
  }

  handleClickGetValue2() {
    const elm = this.template.querySelector(
      'c-lwc-select[data-selector="multi-select"]'
    );
    const value = elm.value;
    console.log(`Selected values: ${value}`);
    const event = new ShowToastEvent({
      title: "Success",
      message: `Selected values: ${value}`,
    });
    this.dispatchEvent(event);
  }

  handleClickChangeValue() {
    const elm = this.template.querySelector(
      'c-lwc-select[data-selector="pre-selected"]'
    );
    elm.value = "A";
  }
}
