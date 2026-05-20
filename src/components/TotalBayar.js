import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants'

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
      if (this.props.keranjangs.length === 0) return;

      const pesanan = {
          total_bayar: totalBayar,
          menus: this.props.keranjangs
      }

      axios.post(API_URL + "pesanans", pesanan).then(() => {
        const deleteRequests = this.props.keranjangs.map((item) =>
          axios.delete(API_URL + "keranjangs/" + item.id)
        );

        Promise.all(deleteRequests).finally(() => {
          this.props.history.push('/sukses', { fromBayar: true });
        });
      });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="floating-total-wrap">
        <Card className="total-bayar-card">
          <Card.Body>
            <h5 className="mb-3">
              Total Harga :{" "}
              <strong className="float-right">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h5>
            <Button
              variant="primary"
              block
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
