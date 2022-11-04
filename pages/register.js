import Footer from "../components/Footer";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <main className="container h-screen w-screen mx-auto flex flex-col">
      <Header />
      <div className="container flex flex-row my-auto">
        <RegisterForm />
      </div>
      <Footer />
    </main>
  );
};

export default Register;
