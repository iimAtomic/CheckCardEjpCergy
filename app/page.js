import QrBlock from "../components/QrBlock";

export default function HomePage() {
  return (
    <main className="container">
      <section className="panel">
        <h1>Scanne pour recevoir un verset</h1>
        <p className="subtitle">
          Ouvre ton appareil photo, scanne le QR code et decouvre une carte
          inspirante.
        </p>
        <QrBlock />
      </section>
    </main>
  );
}
