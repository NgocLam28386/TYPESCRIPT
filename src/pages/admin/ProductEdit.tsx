import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getProduct } from "~/apis/product";
import { TProduct } from "~/interfaces/Product";

type Props = {
  onEdit: (data: TProduct) => void;
};

const schemaProduct = Joi.object({
  title: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
});

const ProductEdit = ({ onEdit }: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: joiResolver(schemaProduct),
  });
  const onSubmit: SubmitHandler<TProduct> = (data) => {
    onEdit({ ...data, id });
  };

  useEffect(() => {
    (async () => {
      const data = await getProduct(`${id}`);
      setProduct(data);
    })();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit product</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            defaultValue={product?.title}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="price"
            defaultValue={product?.price as number}
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="description"
            defaultValue={product?.description}
            {...register("description")}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
