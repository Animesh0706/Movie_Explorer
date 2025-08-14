import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen grid place-items-center">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <Link to="/" className="underline text-primary">Return to Home</Link>
      </section>
    </main>
  );
};

export default NotFound;