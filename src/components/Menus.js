import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4 menu-card-wrap">
      <Card className="shadow menu-card menu-card-entrance" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          className="menu-card-img"
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body className="menu-card-body">
          <Card.Title className="menu-card-title mb-1">{menu.nama}</Card.Title>
          <p className="menu-card-code mb-2">{menu.kode}</p>
          <Card.Text className="menu-card-price mb-0">Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
