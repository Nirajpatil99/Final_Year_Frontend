import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <>
      <Head>
        <title>Fluid Control</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container h-screen w-screen mx-auto">
        <Header />
        <div className="container flex flex-row  h-4/6">
          <img
            src={"/data_reports.svg"}
            className="hidden pl-12 lg:block basis-1/2"
          />
          <Login className="basis-1/2" />
        </div>
        <Footer />
      </main>
    </>
  );
}
