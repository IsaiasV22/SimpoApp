import QrScanner from "../components/qrScanner/QrScanner";

export default async function page() {
  return (
    <div className="main-content">
      <QrScanner/>
    </div>
  );
}