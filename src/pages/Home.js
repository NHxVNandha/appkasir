import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL, FALLBACK_PRODUCTS } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
      loadingMenus: true,
    };
  }

  componentDidMount() {
    this.getMenusByCategory(this.state.categoriYangDipilih);
    this.getKeranjangs();
  }

  getMenusByCategory = (categoryName) => {
    this.setState({ loadingMenus: true });

    axios
      .get(API_URL + "products?category.nama=" + categoryName)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus, loadingMenus: false });
      })
      .catch((error) => {
        const menus = FALLBACK_PRODUCTS.filter(
          (item) => item.category.nama === categoryName
        );
        this.setState({ menus, loadingMenus: false });
        console.log("Error yaa ", error);
      });
  };

  getKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        this.setState({ keranjangs: this.state.keranjangs || [] });
        console.log("Error yaa ", error);
      });
  };

  tambahKeranjangLokal = (value) => {
    const keranjangsLokal = [...this.state.keranjangs];
    const keranjangSama = keranjangsLokal.find(
      (item) => item.product && item.product.id === value.id
    );

    if (keranjangSama) {
      const keranjangsBaru = keranjangsLokal.map((item) => {
        if (item.product.id !== value.id) return item;

        const jumlahBaru = item.jumlah + 1;
        return {
          ...item,
          jumlah: jumlahBaru,
          total_harga: jumlahBaru * item.product.harga,
        };
      });

      this.setState({ keranjangs: keranjangsBaru });
      return;
    }

    const itemBaru = {
      id: Date.now(),
      jumlah: 1,
      total_harga: value.harga,
      product: value,
    };

    this.setState({ keranjangs: [...keranjangsLokal, itemBaru] });
  };

  updateKeranjangLokal = (keranjangId, dataBaru) => {
    const keranjangsBaru = this.state.keranjangs.map((item) => {
      if (item.id !== keranjangId) return item;
      return {
        ...item,
        ...dataBaru,
      };
    });

    this.setState({ keranjangs: keranjangsBaru });
  };

  hapusKeranjangLokal = (keranjangId) => {
    const keranjangsBaru = this.state.keranjangs.filter(
      (item) => item.id !== keranjangId
    );
    this.setState({ keranjangs: keranjangsBaru });
  };

  clearKeranjangsLokal = () => {
    this.setState({ keranjangs: [] });
  };

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    this.getMenusByCategory(value);
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getKeranjangs();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getKeranjangs();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        this.tambahKeranjangLokal(value);
        swal({
          title: "Mode Offline",
          text: "Menu ditambahkan ke hasil lokal (tanpa server).",
          icon: "success",
          button: false,
          timer: 1200,
        });
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs, loadingMenus } = this.state;
    return (
        <div className="mt-3 page-shell">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col className="mt-3">
                <h4 className="section-title">
                  <strong>Daftar Produk</strong>
                </h4>
                <hr className="section-divider" />
                <Row className="overflow-auto menu">
                  {loadingMenus &&
                    Array.from({ length: 6 }).map((_, index) => (
                      <Col md={4} xs={6} className="mb-4" key={`skeleton-${index}`}>
                        <div className="menu-skeleton-card" />
                      </Col>
                    ))}
                  {!loadingMenus && menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil
                keranjangs={keranjangs}
                refreshKeranjangs={this.getKeranjangs}
                updateKeranjangLokal={this.updateKeranjangLokal}
                hapusKeranjangLokal={this.hapusKeranjangLokal}
                clearKeranjangsLokal={this.clearKeranjangsLokal}
                {...this.props}
              />
            </Row>
          </Container>
        </div>
    );
  }
}
