export const initializeFieldValues = (data: any, withSection: boolean = true) => {
    const fields: any = {};

    if (withSection) {
        data.forEach((section: any) =>
            section.fields.forEach((field: any) => {
                switch (field.type) {
                    case "checkbox":
                        fields[field.name] = [];
                        break;
                    default:
                        fields[field.name] = field?.default || "";
                }
            })
        );
    } else {
        data.forEach((field: any) => {
            switch (field.type) {
                case "checkbox":
                    fields[field.name] = [];
                    break;
                default:
                    fields[field.name] = field?.default || "";
            }
        });
    }
    return fields;
};

export const initializeValidatorValues = (data: any, withSection: boolean = true) => {
    const validity: any = {};

    if (withSection) {
        data.forEach((section: any) =>
            section.fields.forEach((field: any) => {
                if (field.required) validity[field.name] = false;
                else validity[field.name] = true;
            })
        );
    } else {
        data.forEach((field: any) => {
            if (field.required) validity[field.name] = false;
            else validity[field.name] = true;
        });
    }
    return validity;
};
