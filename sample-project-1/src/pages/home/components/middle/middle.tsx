import React, { useEffect } from "react";
import { selectPostsByUser, fetchPosts, selectPosts, postType } from "../../../../store/slices/posts";
import { useSelectorHook, useDispatchHook } from "../../../../store/hooks/useHooks";

// component
import Spinner from "../../../../components/snipper/spinner";

function MC() {
   const dispatch = useDispatchHook();
   const postsByUser: any = useSelectorHook((state: any) => selectPostsByUser(state, 1));
   const posts: any = useSelectorHook((state: any) => selectPosts(state));
   useEffect(() => {
      dispatch(fetchPosts());
   }, [dispatch]);

   return (
      <div className="text-slate-900 dark:text-white min-h-screen sm:rounded-md transition-03">
         <div className="w-full">
            {postsByUser.loading ? (
               <div className="w-full flex justify-center items-center py-2">
                  <Spinner spin={postsByUser.loading} />
               </div>
            ) : postsByUser.error ? (
               <div className="w-full text-center text-base py-2 text-red-500">
                  <p>{postsByUser.error}</p>
               </div>
            ) : postsByUser.data.length ? (
               <div className="w-full">
                  {postsByUser.data.map((post: postType, index: number) => {
                     return (
                        <div
                           key={index}
                           className="w-full mb-4 last:mb-0 border border-slate-200 dark:border-slate-600 
                                     sm:rounded-md shadow-lg p-3 bg-white dark:bg-slate-800 transition-03"
                        >
                           <div>id : {post.id}</div>
                           <div>userid : {post.userId}</div>
                           <div>title : {post.title}</div>
                           <div>body : {post.body}</div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <div className="w-full text-center">
                  <p>هیچ پستی برای نمایش وجود ندارد</p>
               </div>
            )}
         </div>
      </div>
   );
}

export default MC;
