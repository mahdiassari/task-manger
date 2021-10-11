import * as Yup from "yup";
const requireMessage = "This field is Required";

export const string = (label: string, isRequire: boolean = false) => {
  if (isRequire) {
    return Yup.string()
      .label(label)
      .typeError(requireMessage)
      .required(requireMessage);
  } else {
    return Yup.string().label(label).nullable(true);
  }
};
