import LC from "./components/left/left";
import MC from "./components/middle/middle";
import RC from "./components/right/right";

function HomePage() {
   return (
      <div data-name="home" className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full">
         {/* right section */}
         <div data-name="right-sidebar" className="col-span-12 md:col-span-4 lg:col-span-2">
            <RC />
         </div>
         {/* middle section */}
         <div data-name="main" className="col-span-12 md:col-span-8 lg:col-span-7">
            <MC />
         </div>
         {/* left section */}
         <div data-name="left-sidebar" className="hidden lg:col-span-3 lg:block h-full">
            <LC />
         </div>
      </div>
   );
}

export default HomePage;
