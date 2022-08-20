import type { NextPage, InferGetServerSidePropsType } from "next";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout/Layout";
import Base from "../components/Home/Base";
import Loading from "../components/Indicator/Loading";

import useLanguage from "../hooks/useLanguage";
import useAuth from "../hooks/useAuth";
import Dashboard from "../components/Home/Dashboard";

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const lang = useLanguage();
    const { user } = useAuth();

    return (
        <Layout title="Home" description="" lang={lang}>
            {user ? <Dashboard user={user} /> : <Base dispatch={dispatch} />}
        </Layout>
    );
};

export default Home;
