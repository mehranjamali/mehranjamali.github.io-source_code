import { describe, beforeEach, test, expect } from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { testStore } from "../../configureStore";
import { postType, fetchPosts, selectPosts, selectPostsByUser } from "../posts";
import { stateType } from "../../types/type";

describe("postsSlice", () => {
   let mock: any;
   let store: any;

   beforeEach(() => {
      mock = new MockAdapter(axios);
      store = testStore();
   });

   // state posts
   const createPostsState = (): { entities: { posts: stateType<postType[]> } } => ({
      entities: {
         posts: {
            error: "",
            lastFetch: Date.now(),
            loading: false,
            data: [
               { id: 1, title: "title-1", userId: 1, body: "" },
               { id: 2, title: "title-2", userId: 2, body: "" },
               { id: 3, title: "title-3", userId: 3, body: "" },
               { id: 4, title: "title-3", userId: 3, body: "" },
            ],
         },
      },
   });
   const postsSlice = () => store.getState().entities.posts;

   // fetching
   describe("fetching posts", () => {
      describe("if the posts exists in the cache", () => {
         test("posts should not be fetched from the server again", async () => {
            const state = createPostsState();
            mock.onGet("/posts").reply(200, state.entities.posts.data);

            await store.dispatch(fetchPosts());
            await store.dispatch(fetchPosts());

            expect(mock.history.get.length).toBe(1);
         });
      });
      describe("if the posts don't exists in the cache", () => {
         // data fetched Received "200"
         test("posts should be fetched from the server and put in the store if response status is 200", async () => {
            const state = createPostsState();
            mock.onGet("/posts").reply(200, state.entities.posts.data);

            await store.dispatch(fetchPosts());

            expect(postsSlice().data).toHaveLength(4);
         });
         // data fetched failed "500"
         test("posts should be fetched from the server and not put in the store if response status is not 200", async () => {
            mock.onGet("/posts").reply(500);

            await store.dispatch(fetchPosts());

            expect(postsSlice().data).toHaveLength(0);
         });
         // lodaing
         describe("loading indicator", () => {
            test("loading should be true while fetching the posts", () => {
               mock.onGet("/posts").reply(() => {
                  expect(postsSlice().loading).toBe(true);

                  const state = createPostsState();
                  return [200, state.entities.posts];
               });

               store.dispatch(fetchPosts());
            });
            test("loading should be false after the posts are fetched", async () => {
               const state = createPostsState();
               mock.onGet("/posts").reply(200, state.entities.posts);

               await store.dispatch(fetchPosts());

               expect(postsSlice().loading).toBe(false);
            });
            test("loading should be false if the server returns as error", async () => {
               mock.onGet("/posts").reply(500);

               await store.dispatch(fetchPosts());

               expect(postsSlice().loading).toBe(false);
            });
         });
      });
   });

   // selectors
   describe("posts selectors", () => {
      test("select all posts", () => {
         const state = createPostsState();

         const result = selectPosts(state).data;

         expect(result).toHaveLength(4);
      });
      test("select posts by user", () => {
         const state = createPostsState();
         const select = selectPostsByUser();
         const result = select(state, 3).data;

         expect(result).toHaveLength(2);
      });
   });
});
