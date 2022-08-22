// @ts-check

/**
 * @description validate options. options is an array of objects with value and label properties
 * @param {Object[]} input
 * @returns {Boolean} false if is invalid
 */
export function validateOptions(input = []) {
  if (!input || !Array.isArray(input) || input.length === 0) return false;

  // check if array of objects contain label and value properties
  return input.every((option) => {
    return (
      Object.prototype.hasOwnProperty.call(option, "label") &&
      option.label &&
      typeof option.label === "string" &&
      Object.prototype.hasOwnProperty.call(option, "value") &&
      option.value &&
      typeof option.value === "string" &&
      option.value.trim().length > 0
    );
  });
}

/**
 * @description process options. by selecting the default value. If no value is selected, the first option is selected
 * @param {Object[]} options
 * @param {String} value
 * @returns {Object[]}
 */
export function processOptions(options = [], value = null) {
  const processedOptions = options.map((option) => {
    return {
      ...option,
      selected: option.value === value,
    };
  });

  const hasOneSelected = processedOptions.some((option) => option.selected);
  if (!hasOneSelected && options.length > 0) {
    processedOptions[0].selected = true;
  }

  return processedOptions;
}

/**
 * @description Normalize Boolean
 * @param {*} value value
 * @returns {Boolean} value in boolean
 */
export function normalizeBoolean(value) {
  if (
    typeof value === "string" &&
    (value === "0" || value.toLowerCase() === "false")
  )
    return false;
  return Boolean(value);
}

/**
 * @description Validates string
 * @param {String} value
 * @returns {String|null}
 */
export function validateString(value = "") {
  if (typeof value !== "string") return null;
  const _value = value.trim();
  return _value.length === 0 ? null : _value;
}

/**
 * @description Validate Variant. Default is label-hidden
 * The variant changes the appearance of the combobox.
 * Accepted variants include standard, label-hidden, label-inline, and label-stacked.
 * This value defaults to standard.
 * Use label-hidden to hide the label but make it available to assistive technology.
 * Use label-inline to horizontally align the label and combobox.
 * Use label-stacked to place the label above the combobox.
 * @param {String} input
 * @returns {String} valid variant mode
 */
export function validateVariant(input = "label-hidden") {
  const VALID_VARIANTS = ["label-hidden", "label-stacked", "label-inline"];
  if (!input || input.trim().length === 0 || !VALID_VARIANTS.includes(input)) {
    return VALID_VARIANTS[0];
  }
  return input;
}

/**
 * @description validate value. value is an object with apiName and label properties
 * @param {Object} input
 * @returns {Boolean} false if is invalid
 */
export function validateValue(input = null) {
  return (
    input &&
    typeof input === "object" &&
    Object.prototype.hasOwnProperty.call(input, "apiName") &&
    input.apiName &&
    Object.prototype.hasOwnProperty.call(input, "label") &&
    input.label
  );
}

/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
export function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
