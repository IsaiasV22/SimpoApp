import React from "react";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ListaUsuarios from "@/app/components/listaUsuarios/ListaUsuarios";
import { id } from "date-fns/locale";

const page = ({params}) => {
  const idEvento = params.element;
  return <>{<ListaUsuarios idEvento={idEvento}/>}</>;
};
export default page;
