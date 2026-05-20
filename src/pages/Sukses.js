import React, { Component } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class Sukses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanans: [],
      loading: true,
    };
  }

  componentDidMount() {
    const riwayatLokal = JSON.parse(localStorage.getItem("pesanans_lokal") || "[]");

    axios
      .get(API_URL + "pesanans")
      .then((res) => {
        const pesanans = res.data.slice().reverse();
        this.setState({ pesanans, loading: false });
      })
      .catch((error) => {
        this.setState({ pesanans: riwayatLokal, loading: false });
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { pesanans, loading } = this.state;
    const fromBayar =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.fromBayar;

    return (
      <Container className="mt-4 mb-5">
        {fromBayar && (
          <div className="text-center mb-4">
            <Image src="assets/images/sukses.png" width="280" fluid />
            <h2>Sukses Pesan</h2>
            <p>Terimakasih Sudah Memesan!</p>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">
            <strong>Riwayat Pesanan</strong>
          </h4>
          <Button variant="primary" as={Link} to="/">
            Kembali ke Kasir
          </Button>
        </div>

        {loading && <p>Memuat riwayat...</p>}

        {!loading && pesanans.length === 0 && (
          <Card className="p-4 text-center">
            <p className="m-0">Belum ada riwayat pesanan.</p>
          </Card>
        )}

        {!loading &&
          pesanans.map((pesanan) => (
            <Card className="mb-3" key={pesanan.id}>
              <Card.Body>
                <Row className="mb-2">
                  <Col>
                    <strong>Pesanan #{pesanan.id}</strong>
                  </Col>
                  <Col className="text-right">
                    <strong>
                      Total: Rp. {numberWithCommas(pesanan.total_bayar || 0)}
                    </strong>
                  </Col>
                </Row>
                {(pesanan.menus || []).map((item) => (
                  <Row key={item.id} className="py-1 border-top">
                    <Col>{item.product && item.product.nama}</Col>
                    <Col className="text-center">x{item.jumlah}</Col>
                    <Col className="text-right">
                      Rp. {numberWithCommas(item.total_harga || 0)}
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
          ))}
      </Container>
    );
  }
}
