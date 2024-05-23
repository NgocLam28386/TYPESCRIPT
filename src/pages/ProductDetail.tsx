import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "~/apis/product";
import { TProduct } from "~/interfaces/Product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);
  useEffect(() => {
    (async () => {
      const data = await getProduct(`${id}`);
      setProduct(data);
    })();
  }, []);
  return (
    <div>
      <h1>Chi tiet san pham</h1>
      <div className="product">
        <div className="row">
          <div className="col">
            <img src={product?.thumbnail} alt={product?.title} />
            <div className="imagesList">
              {product?.images &&
                product.images.map((item) => {
                  return <img className="img-item" src={item} />;
                })}
            </div>
          </div>
          <div className="col">
            <h2>{product?.title}</h2>
            <p>Gia: {product?.price}</p>
            <p>{product?.description}</p>
            <button className="btn btn-primary w-100">Add to card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
