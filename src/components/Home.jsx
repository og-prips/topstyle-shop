import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return <h1>{user && user.email}</h1>;
};

export default Home;
