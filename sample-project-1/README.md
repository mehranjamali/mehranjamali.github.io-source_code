## React + Redux real world example.
 You can view a live demo over at https://mehranjamali.github.io \
 I left the front `Redux DevTools` open so that you can check the site better.
- You can see the code on my GitHub: [source code](https://github.com/mehranjamali/mehranjamali.github.io-source_code/tree/master/sample-project-1) 

 
 In this project I have developed some features of Linkedin and other similar Websites.\
 The purpose of doing this project is to challenge myself and create a portfolio.\
 I would be grateful if you send me your comments and criticisms.
 - Email: mehranjamali117@gmail.com - Linkedin: [mehranjamali](https://www.linkedin.com/in/mehran-jamali-b2a43b239/)

## Packages
react - @reduxjs/toolkit - tailwindcss - typescript - redux-thunk , [view all](https://github.com/mehranjamali/mehranjamali.github.io-source_code/blob/master/sample-project-1/package.json)

## Functionality overview
The example application does not use any server, everything is local but I implemented authentication and asynchronous operation logic in my services and middlewares, I have used `Redux-Thunk` for this purpose.

General functionality: 
- Authenticate users. ( login page:  Sign in with any `username` and `password` you want + Sign in with `google` + logout button )
- Create post ( with photo )
- Like 
- Follow other users
- Save your Favorite post
- Report post 
- Hide post
- Notification in navbar
- CRUD Author and Book (Table)

The general page breakdown looks like this: (Protected = need login)
- Home page (URL: /#/ )
  - create post button ( with photo ) - Protected 
  - List of posts 
    - like - Protected 
    - report - Protected 
    - hide - Protected 
    - copy link
  - List of users you can follow - Protected 
  - List of popular articles
  - User feed - Protected 
  - Favorite posts navigate button - Protected 
  - List of recently published articles
- Sign in page (URL: /#/login) 
  - Sign in with any `username` and `password` you want
  - Sign in with google
- Favorite posts page (URL: /#/saved-posts) - Protected 
- Authors page (URL: /#/author) - Protected 
  - CRUD Author
  - CRUD Book
  - Nested Table
  - Pagination
  - Search


## test 
I implemented `unit test` for "store/slices/posts.ts" inside `__tests__` folder using `jest` and `axios-mock-adapter` 

## Redux


![Web 1920 – 1(crop)](https://user-images.githubusercontent.com/29439821/197222633-725dd617-5a24-41ff-9486-599ce9d43d2b.png)

