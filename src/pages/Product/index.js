import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services";
import {
  Button,
  Col,
  Image,
  Input,
  Rate,
  Row,
  Skeleton,
  Space,
  Typography,
  message,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./Product.scss";
import { addCartItem, makeUpLabel } from "../../utils";
import { AppContext } from "../../context";

function Product() {
  const [product, setProduct] = useState();
  const [cartQty, setCartQty] = useState(1);
  const [loadingCheckOut, setLoadingCheckOut] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const { cartItems, setCartItems } = useContext(AppContext);
  const navigator = useNavigate();

  const params = useParams();
  const key = params.productId;
  console.log("🚀 ~ file: index.js:8 ~ Product ~ key:", key);

  useEffect(() => {
    setFetchingData(true);
    getSingleProduct(key).then((resp) => {
      console.log("🚀 ~ file: index.js:13 ~ getSingleProduct ~ resp:", resp);
      setTimeout(() => {
        setProduct(resp);
        setFetchingData(false);
      }, 1000);
    });
  }, []);

  const handleAddToCart = () => {
    setLoadingAddToCart(true);

    message.success(`${product.title} has been added to cart 👌`);
    let newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
    setTimeout(() => {
      setLoadingAddToCart(false);
    }, 1500);
  };

  const handleCheckout = () => {
    setLoadingCheckOut(true);

    message.success(`${product.title} has been added to cart 👌`);
    let newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
    setTimeout(() => {
      setLoadingCheckOut(false);
      navigator("/cart");
    }, 1500);
  };

  return (
    <>
      {!fetchingData && !!product ? (
        <Row gutter={[8, 16]} wrap>
          <Col flex={2} xs={0} sm={0} md={10}>
            <div className="productInfoLeftPanel">
              <div className="mainThumbnail">
                <Image src={product.thumbnail} width={200} />
              </div>
              <div className="imageGallery">
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  <Space size={"middle"}>
                    {product.images.map((img, index) => (
                      <Image src={img} width={50} key={index} />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              </div>
            </div>
          </Col>
          <Col flex={3} sm={24} md={14}>
            <div className="productInfoRightPanel">
              <Typography.Title level={3}>{product.title}</Typography.Title>
              <div className="productRating">
                <Space>
                  <Rate value={product.rating} allowHalf></Rate>
                  <Typography.Text>Sold {product.stock}</Typography.Text>
                </Space>
              </div>
              <div className="productPrice">
                Price:{" "}
                <span className="spanPrice">
                  $
                  {parseFloat(
                    (product.price * (100 - product.discountPercentage)) / 100
                  ).toFixed(0)}
                </span>{" "}
                <Typography.Text
                  style={{
                    background: "red",
                    color: "yellow",
                    padding: "0 5px",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                >
                  {parseFloat(product.discountPercentage).toFixed(0)}% OFF
                </Typography.Text>{" "}
                <Typography.Text
                  delete
                  strong
                  type="danger"
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  ${product.price}
                </Typography.Text>
              </div>
              <div className="productDesc">
                <Typography.Text strong> {product.description}</Typography.Text>
              </div>

              <div className="productMeta">
                <div className="productMetaRow">
                  <span className="productMetaLeft">Brand</span>
                  <span className="productMetaRight">{product.brand}</span>
                </div>
                <div className="productMetaRow">
                  <span className="productMetaLeft">Category</span>
                  <span className="productMetaRight">
                    {makeUpLabel(product.category)}
                  </span>
                </div>
                <div className="productMetaRow">
                  <span className="productMetaLeft">Delivery</span>
                  <span className="productMetaRight">FREE Delivery 📦</span>
                </div>
                <div className="productMetaRow">
                  <span className="productMetaLeft">Quantity</span>
                  <div className="productMetaRight cartQty ">
                    <Button
                      onClick={() => setCartQty(cartQty > 0 ? cartQty - 1 : 0)}
                    >
                      <MinusOutlined />
                    </Button>
                    <Input
                      value={cartQty}
                      min={0}
                      style={{ width: "50px", textAlign: "center" }}
                    />
                    <Button onClick={() => setCartQty(cartQty + 1)}>
                      <PlusOutlined />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="addToCart">
                <Space>
                  <Button
                    type="primary"
                    onClick={handleAddToCart}
                    loading={loadingAddToCart}
                  >
                    Add To cart
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={handleCheckout}
                    loading={loadingCheckOut}
                  >
                    Checkout
                  </Button>
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Row gutter={[8, 16]} wrap>
          <Col flex={2} xs={0} sm={0} md={10}>
            <div className="productInfoLeftPanel">
              <div className="mainThumbnail">
                <Skeleton.Image active style={{ width: "200px" }} />
              </div>
              <div className="imageGallery">
                <Space size={"middle"}>
                  <Skeleton.Image
                    active
                    style={{ width: "50px", height: "25px" }}
                  />
                  <Skeleton.Image
                    active
                    style={{ width: "50px", height: "25px" }}
                  />
                  <Skeleton.Image
                    active
                    style={{ width: "50px", height: "25px" }}
                  />
                  <Skeleton.Image
                    active
                    style={{ width: "50px", height: "25px" }}
                  />
                </Space>
              </div>
            </div>
          </Col>
          <Col flex={3} sm={24} md={14}>
            <div className="productInfoRightPanel">
              <Skeleton.Input active size={"default"} />
              <div className="productRating">
                <Space>
                  <Skeleton.Input active size={"small"} />
                  <Skeleton.Input active size={"small"} />
                </Space>
              </div>
              <div className="productPrice">
                <Skeleton.Input active size={"default"} />
              </div>
              <div className="productDesc">
                <Skeleton
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              </div>

              <div className="productMeta">
                <Skeleton
                  paragraph={{
                    rows: 3,
                  }}
                  active
                />
              </div>
              <div className="addToCart">
                <Space>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Product;