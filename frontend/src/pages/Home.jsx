import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {/* TODO: delete commit */}
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="md:ml-20 mt-10 md:mt-0 text-3xl">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mt-4 md:mt-0"
            >
              Shop
            </Link>
          </div>

          <div className="mt-2 md:mt-4">
            <div className="flex justify-center flex-wrap">
              {data.products.map((product) => (
                <div key={product._id} className="m-2">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;