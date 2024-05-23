import { SubmitHandler, useForm } from "react-hook-form";
import { TProduct } from "~/interfaces/Product";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type Props = {
  onAdd: (data: TProduct) => void;
};

const schemaProduct = Joi.object({
  title: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
});

const ProductAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: joiResolver(schemaProduct),
  });
  const onSubmit: SubmitHandler<TProduct> = (data) => {
    onAdd(data);
  };

  return (
    <div>
      <h2>Add product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
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

export default ProductAdd;
