
import Simposios from "../components/simposios/Simposios";
import { urlServer } from "../Utiles";

//fecth talleres
const fetchTalleres = async () => {
  const res = await fetch(`${urlServer}talleres/Alltalleres`);
  const data = await res.json();
  return data;
};

export default async function page() {
  const talleres = await fetchTalleres();
  console.log("talleres -> ", talleres);
  return (
    <>
      <Simposios talleres={talleres}/>
    </>
  );
}
