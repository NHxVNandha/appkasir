import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL, FALLBACK_CATEGORIES } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      loadingCategories: true,
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories, loadingCategories: false });
      })
      .catch((error) => {
        this.setState({
          categories: FALLBACK_CATEGORIES,
          loadingCategories: false,
        });
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { categories, loadingCategories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4 className="section-title">
          <strong>Daftar Kategori</strong>
        </h4>
        <hr className="section-divider" />
        <ListGroup className="category-group">
          {loadingCategories &&
            Array.from({ length: 3 }).map((_, index) => (
              <ListGroup.Item key={`category-skeleton-${index}`} className="category-item">
                <div className="category-skeleton" />
              </ListGroup.Item>
            ))}
          {categories &&
            !loadingCategories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={`category-item ${
                  categoriYangDipilih === category.nama ? "category-aktif" : ""
                }`}
                style={{cursor: 'pointer'}}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
