import "@components/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="bg-black h-screen text-white">
      <Component {...pageProps} />
    </main>
  );
}
