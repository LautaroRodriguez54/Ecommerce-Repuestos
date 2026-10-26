"use client";
import { SearchBox } from "../ui/form/SearchBox";
import { SelectBox } from "../ui/form/SelectBox";
import styles from "../admin/admin.module.css";
import { Button } from "../ui/Button/Button";
import Filter from "../icon/Filter";
import { Table } from "../ui/table/Table";
import {Pagination} from '../ui/Pagination';
const option = ["Cliente", "Administrador"];
const title = ["ID", "NOMBRE", "EMAIL", "TIPO", "ACCIONES"];
const data = [
  {
    id: "1DDDDD23",
    nombre: "Juan Pérez",
    email: "juan.perez@gmail.com",
    tipo: "Administrador",
  },
  {
    id: "12DDDDDDD3",
    nombre: "María González",
    email: "maria.gonzalez@gmail.com",
    tipo: "Cliente",
  },
  {
    id: "12DDDDDDDD3",
    nombre: "Lucas Fernández",
    email: "lucas.fernandez@gmail.com",
    tipo: "Cliente",
  },
  {
    id: "12DDDDDD3",
    nombre: "Sofía Ramírez",
    email: "sofia.ramirez@gmail.com",
    tipo: "Administrador",
  },
  {
    id: "12DDDDDDDDD3",
    nombre: "Mateo Torres",
    email: "mateo.torres@gmail.com",
    tipo: "Cliente",
  },
];
const itemsPerPage = 8;
const maxPageButtons = 3;
export const UserContent = () => {
  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox placeholder={"busca"} />
        <SelectBox option={option} label="TIPO:" icon={<Filter />} />
        <Button
          buttonText={"Registrar"}
          variant={"accent"}
          isButton={false}
          linkHref={"/register"}
        />
      </div>
       <Pagination itemsPerPage={itemsPerPage} maxPageButtons={maxPageButtons} data={data} >
        {(currentData) => (
          <Table
            title={title}
            data={currentData}
            showActions
          />
        )}
      </Pagination>
      
    </>
  );
};
