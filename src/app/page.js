import AddProduct from "@/components/AddProduct";
import ListProduct from "@/components/ListProduct";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

export default function Home() {

  return (
    <main className="u-main-center">
      <div>
        <h1 className="u-text-center heading-level-4">
          Product Information Management
        </h1>
      </div>
      <AddProduct/>
      <ListProduct/>
    </main>
  );
}
