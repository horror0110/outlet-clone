import Hero from "@/components/Hero";
import Product from "@/components/Product";


export default function Home() {
  return (
      <div className="mx-10">
        <div className="my-10">

        <Hero/>

        </div>

        <div>
          <Product/>
        </div>
        
      </div>
  )
}
