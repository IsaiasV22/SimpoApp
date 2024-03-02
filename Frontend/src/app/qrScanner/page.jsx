import QRScanner from "../components/qrScanner/QrScanner";

export default async function page() {
  return (
    <div className="main-content">
      <QRScanner/>
    </div>
  );
}