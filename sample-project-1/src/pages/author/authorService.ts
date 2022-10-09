type genreType = {
   id: number;
   name: string;
};

type authorType = {
   id: number;
   name: string;
   born: any;
   died: any;
   image: string;
   country: string;
};

type bookType = {
   id: number;
   title: string;
   headline: string;
   description: string;
   image: string;
   rateNumber: number;
   rateUserNumber: string;
   publishDate: any;
   genres: genreType[];
   authorId: number;
};

type authorBlockObjType = {
   id: number;
   author: authorType;
   books: bookType[];
};

const genres: genreType[] = [
   { id: 1, name: "Fantasy Fiction" },
   { id: 2, name: "Reference work" },
   { id: 3, name: "Adventure" },
   { id: 4, name: "High Fantasy" },
   { id: 5, name: "genre 1" },
   { id: 6, name: "genre 2" },
   { id: 7, name: "genre 3" },
];

const authors: authorType[] = [
   {
      id: 4,
      name: "J.R.R. Tolkien",
      born: "1892",
      died: "1973",
      country: "British",
      image: "https://m.media-amazon.com/images/M/MV5BMGMxMmRkNzctMWQzYy00MTY3LWEzMDAtMzEzMDhkZWI4MjZlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
   },
   {
      id: 1,
      name: "J.K. Rowling",
      born: "1965",
      died: "",
      country: "British",
      image: "https://stories.jkrowling.com/wp-content/uploads/2021/09/Shot-B-105_V2_CROP-e1630873059779.jpg",
   },
   {
      id: 2,
      name: "George R.R. Martin",
      born: "1948",
      died: "",
      country: "American",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg/1200px-Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg",
   },
   {
      id: 3,
      name: "F.Scott Fitzgerald",
      born: "1896",
      died: "1940",
      country: "American",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kY8_Lbldeu8EEIxXpLK_QH--8K8PyMcfF6c8Wzu1HnwFTrON",
   },
];

const authorWithBooksList: authorBlockObjType[] = [
   {
      id: 1,
      author: authors[0],
      books: [
         {
            id: 1,
            title: "Lord of The Rings",
            headline: "the Fellowship of the Ring",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            rateNumber: 8.5,
            rateUserNumber: "900K",
            publishDate: "1954",
            image: "http://prodimage.images-bn.com/pimages/0794043554223_p0_v1_s1200x630.jpg",
            genres: [genres[0], genres[1]],
            authorId: authors[0].id,
         },
         {
            id: 2,
            title: "Lord of The Rings",
            headline: "",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            rateNumber: 9.1,
            rateUserNumber: "1.5M",
            publishDate: "1954",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
            genres: [genres[2], genres[3]],
            authorId: authors[0].id,
         },
         {
            id: 3,
            title: "Lord of The Rings",
            headline: "The Two Towers",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            rateNumber: 8.8,
            rateUserNumber: "1.2M",
            publishDate: "1954",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a1/The_Two_Towers_cover.gif",
            genres: [genres[0]],
            authorId: authors[0].id,
         },
         {
            id: 4,
            title: "Lord of The Rings",
            headline: "The Return of the King",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            rateNumber: 9.2,
            rateUserNumber: "950K",
            publishDate: "1955",
            image: "https://m.media-amazon.com/images/I/41lbrACxWWL.jpg",
            genres: [genres[0], genres[2]],
            authorId: authors[0].id,
         },
      ],
   },

   {
      id: 2,
      author: authors[1],
      books: [
         {
            id: 5,
            title: "Harry Potter",
            headline: "the Philosopher's Stone",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            image: "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781526602381.jpg",
            publishDate: "1997",
            rateNumber: 8.5,
            rateUserNumber: "1.1M",
            genres: [genres[0], genres[2], genres[3]],
            authorId: authors[1].id,
         },
         {
            id: 6,
            title: "Harry Potter",
            headline: "the Chamber of Secrets",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            image: "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408865408.jpg",
            publishDate: "1998",
            rateNumber: 8.3,
            rateUserNumber: "800K",
            genres: [genres[0], genres[2], genres[3]],
            authorId: authors[1].id,
         },
         {
            id: 7,
            title: "Harry Potter",
            headline: "the Prisoner of Azkaban",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsH_VR4x_lGSt4pkOA5y9dHFw5iY8nfHQDKli4JY87MbrhGVjqvmhqaCUUZ_KurNu15Dk&usqp=CAU",
            publishDate: "1999",
            rateNumber: 9.5,
            rateUserNumber: "1.2M",
            genres: [genres[0], genres[2], genres[3]],
            authorId: authors[1].id,
         },
      ],
   },

   {
      id: 3,
      author: authors[2],
      books: [
         {
            id: 8,
            title: "A Game Of Thrones",
            headline: "THE ILLUSTRATED EDITION",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            image: "https://images-na.ssl-images-amazon.com/images/I/A12tbaSby+L.jpg",
            rateNumber: 9.4,
            rateUserNumber: "1.5M",
            publishDate: "1996",
            genres: [genres[0], genres[2]],
            authorId: authors[2].id,
         },
      ],
   },

   {
      id: 4,
      author: authors[3],
      books: [
         {
            id: 9,
            title: "The Great Gatsby",
            headline: "THE AUTHORIZED EDITION",
            description:
               "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            image: "http://prodimage.images-bn.com/pimages/9780743273565_p0_v14_s1200x630.jpg",
            rateNumber: 9.4,
            rateUserNumber: "1.5M",
            publishDate: "1925",
            genres: [genres[0], genres[2]],
            authorId: authors[3].id,
         },
      ],
   },
];

// exports
// -- type
export type { authorType, bookType, genreType, authorBlockObjType };

// -- lists
export const getAuthorsWithBooksList = () => {
   return authorWithBooksList;
};
export const getAuthorsList = () => {
   return authors;
};
export const getGenresList = () => {
   return genres;
};
