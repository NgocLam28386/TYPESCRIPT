import { Link } from "react-router-dom";
import { TProduct } from "~/interfaces/Product";

type Props = {
  products: TProduct[];
  onDel: (id: number) => void;
};

const Dashboard = ({ products, onDel }: Props) => {
  return (
    <div>
      <h1>Hello, Admin</h1>
      <Link className="btn btn-primary" to="/admin/add">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <img width={60} src={item.thumbnail} alt={item.title} />
              </td>
              <td>{item.description}</td>
              <td>
                <Link to={`/admin/edit/${item.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => onDel(Number(item.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
