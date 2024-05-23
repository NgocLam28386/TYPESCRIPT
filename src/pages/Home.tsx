import { Link } from "react-router-dom";
import { TProduct } from "~/interfaces/Product";
type Props = { products: TProduct[] };
const Home = ({ products }: Props) => {
  return (
    <>
      <h1>Danh sach san pham</h1>
      <div className="row gx-5">
        {products.map((product) => (
          <div className="col col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
            <div key={product.id} className="product-card">
              <Link to={`/shop/${product.id}`}>
                <img width={300} src={product.thumbnail} alt={product.title} />
              </Link>
              <div className="product-content">
                <Link to={`/shop/${product.id}`}>
                  <h2>{product.title}</h2>
                </Link>
                <p>{product.price}</p>
                <p>{product.brand}</p>
                <p>{product.category}</p>
                <button className="btn btn-primary">Add to card</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
