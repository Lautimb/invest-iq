import Header from "../ui/components/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-xl">App lider en finanzas personales</h1>
        <p>Maneja tus finanzas personales like a champ!</p>
      </main>
    </>
  );
}
