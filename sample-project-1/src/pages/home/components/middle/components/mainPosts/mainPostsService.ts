export type hashtagType = {
   tagName: string;
   link: string;
};

export type mainPostType = {
   id: number;
   creatorId: number;
   name: string;
   userImageUrl: string;
   description: string;
   isOnline: boolean;
   postTime: string;
   liked: boolean;
   saved: boolean;
   numberOfLike: number;
   numberOfComments: number;
   postContent: {
      imgUrl?: string;
      text: string;
      tags?: hashtagType[];
   };
};

const mainPostsListLocal: mainPostType[] = [
   {
      id: 220,
      creatorId: 58,
      name: "برنامه نویس شماره 1",
      userImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
      description: "Frontend Developer | React.js",
      isOnline: true,
      postTime: "2 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 12452,
      creatorId: 58,
      name: "برنامه نویس شماره 2",
      userImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
      description: "React | Redux",
      isOnline: false,
      postTime: "5 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         imgUrl: "https://picsum.photos/800/500?random=1",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 24545,
      creatorId: 58,
      name: "برنامه نویس شماره 3 برنامه نویس شماره 3 برنامه نویس شماره 3",
      userImageUrl:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
      description: "Frontend Developer",
      isOnline: true,
      postTime: "8 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 345,
      creatorId: 58,
      name: "برنامه نویس شماره 4",
      userImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
      description: "React",
      isOnline: true,
      postTime: "10 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         imgUrl: "https://picsum.photos/800/500?random=1",
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 4564,
      creatorId: 58,
      name: "برنامه نویس شماره 5",
      userImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
      description: "TypeScript",
      isOnline: false,
      postTime: "14 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         imgUrl: "https://picsum.photos/800/500?random=1",
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 5456,
      creatorId: 58,
      name: "برنامه نویس شماره 6",
      userImageUrl:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
      description: "JavaScript",
      isOnline: false,
      postTime: "18 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         imgUrl: "https://picsum.photos/800/500?random=1",
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 656456,
      creatorId: 58,
      name: "برنامه نویس شماره 7",
      userImageUrl:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
      description: "TS",
      isOnline: false,
      postTime: "20 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         imgUrl: "https://picsum.photos/800/500?random=1",
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
   {
      id: 7564564,
      creatorId: 58,
      name: "برنامه نویس شماره 8",
      userImageUrl:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
      description: "JS",
      isOnline: false,
      postTime: "24 ساعت پیش",
      liked: false,
      saved: false,
      numberOfLike: 221,
      numberOfComments: 32,
      postContent: {
         text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   },
];

export const savePostService = (id: number) => {
   const index = mainPostsListLocal.findIndex((x) => x.id === id);
   if (index > -1) {
      mainPostsListLocal[index] = { ...mainPostsListLocal[index], saved: !mainPostsListLocal[index].saved };
      return true;
   }
   return false;
};

export const getMainPostsListLocal = () => {
   return mainPostsListLocal;
};
