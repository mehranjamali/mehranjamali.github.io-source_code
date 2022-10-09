type HomeLoaderPropsType = {
   loading: boolean;
};

function HomeLoader({ loading }: HomeLoaderPropsType) {
   return (
      <div className={`${!loading && "hidden"} w-52 h-52`}>
         <img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/Linkedin-Logo-2048x1280.png" alt="" />
         <p className={`bg-blue-600 dark:bg-blue-500 h-0.5 w-0 ${loading && "loaderProgressBar"}`}></p>
      </div>
   );
}

export default HomeLoader;
