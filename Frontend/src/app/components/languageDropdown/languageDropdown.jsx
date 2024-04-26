'use client'
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import useGlobalState from "../globalState/GlobalState";
import Form from "react-bootstrap/Form";

export default function languageDropdown() {

    return(
        <NavDropdown.Item onClick={()=>console.log('On click')}>
          <div style={{ display: "flex" }}>
            <i
              className="fa-sharp fa-solid fa-circle-half-stroke"
              style={{ color: "#74C0FC" }}
            ></i>
            Language
            <div style={{ marginLeft: "20px" }}>
              <Form>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                />
              </Form>
            </div>
          </div>
        </NavDropdown.Item>

    )
}