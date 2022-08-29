const handleResetPasswordSubmit = async (values: any, code: string, resetPassword: Function, setLoading: Function) => {
    setLoading(true);
    try {
        if (values.password !== values.confirmPassword) throw new Error("Password does not match");

        await resetPassword(values.password, code);

        setLoading(false);
        return { status: "success" };
    } catch (e) {
        setLoading(false);

        return { status: "fail", error: e };
    }
};

export default handleResetPasswordSubmit;
