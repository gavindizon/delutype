const validateForm = (validityObject: any) => {
    let valid = true;

    Object.keys(validityObject).forEach((key) => {
        if (key !== "datesAvailable") {
            if (validityObject[key] === false || String(validityObject[key])?.trim() === "") valid = false;
        } else {
            if (validityObject[key].length === 0) valid = false;
        }
    });

    return valid;
};

export default validateForm;
