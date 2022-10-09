const recentList = [
   {
      id: 0,
      title: "موارد اخیر شماره 1",
      date: "3آذر1399",
      img: "https://picsum.photos/500/300?random=1",
   },
   {
      id: 1,
      title: "آموزش تایپ اسکریپت ",
      date: "8اسفند1399",
      img: "https://picsum.photos/500/300?random=2",
   },
   {
      id: 2,
      title: "روش اجایل چیست؟",
      date: "2اردیبهشت1400",
      img: "https://picsum.photos/500/300?random=3",
   },
   {
      id: 3,
      title: "آموزش جاوا اسکریپت",
      date: "23خرداد1400",
      img: "https://picsum.photos/500/300?random=4",
   },
   {
      id: 0,
      title: "موارد اخیر شماره 2",
      date: "3آذر1399",
      img: "https://picsum.photos/500/300?random=1",
   },
];

export const getRecentList = () => {
   return recentList;
};

export type getRecentListType = typeof recentList;
