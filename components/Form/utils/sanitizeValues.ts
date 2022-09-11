const sanitizeValues = (values: any, form: any, withSection: boolean = false) => {
    if (withSection) form = form.map((section: any) => section.fields).flat();

    Object.keys(values).map((key) => {
        if (values[key] === undefined) {
            delete values[key];
            return;
        }

        let formField = form.filter((field: any) => field.name === key)[0];
        if (formField)
            switch (formField.type) {
                case "date":
                    values[key] = new Date(values[key]);
                    break;
                case "password":
                    delete values[key];
                    break;
            }
    });

    return values;
};

export default sanitizeValues;
