import { Header } from "../components/Header/Index";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
      <>
        <Header />
        <main>{children}</main>
        {/* Adicione outros elementos do layout aqui, como Footer */}
      </>
    );
  };
  
  export default DefaultLayout;