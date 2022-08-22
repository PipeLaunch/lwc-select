export function computeLabelClass(variant = "label-hidden") {
  return variant === "label-hidden"
    ? "slds-form-element__label slds-assistive-text"
    : "slds-form-element__label";
}

export function computeFormElementClasses(
  variant = "label-hidden",
  errors = null
) {
  const classes = ["slds-form-element"];

  if (variant === "label-inline")
    classes.push("slds-grid", "slds-grid_vertical-align-center"); // slds-form-element_horizontal
  if (errors) classes.push("slds-has-error");
  return classes.join(" ");
}

