import Carousel, { CarouselItem } from "~/components/Carousel";
import BlogSection from "~/components/BlogSection";
import BookSection from "~/components/BookSection";
import { BlogPost } from "~/components/BlogCard";
import { Book } from "~/components/BookCard";

const carouselItems: CarouselItem[] = [
  // {
  //   id: 1,
  //   title: "ยินดีต้อนรับสู่ Stranger's Book",
  //   description: "สำนักพิมพ์หนังสือคุณภาพ",
  //   background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
  // },
  {
    id: 4,
    image: "https://api.playground.chidahp.com/wp-content/uploads/2026/01/New-Project-1.png",
  },
  // {
  //   id: 2,
  //   image: "https://images.www.jamsai.com/banner_images/1763549997290_Banner%20Love%203-01%20(1)%20(1).jpg"
  // }
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "แนะนำหนังสือใหม่: เรื่องราวแห่งการผจญภัย",
    excerpt: "พบกับหนังสือเล่มใหม่ที่เต็มไปด้วยเรื่องราวการผจญภัยที่น่าตื่นเต้น และตัวละครที่น่าจดจำ",
    author: "Stranger's Book",
    date: "15 ม.ค. 2025",
    category: "ใหม่",
    readTime: "5 นาที",
  },
  {
    id: 2,
    title: "เทคนิคการอ่านหนังสือให้มีประสิทธิภาพ",
    excerpt: "เรียนรู้วิธีการอ่านหนังสือที่ช่วยให้คุณเข้าใจเนื้อหาได้ดีขึ้น และจดจำข้อมูลได้นานขึ้น",
    author: "ทีมบรรณาธิการ",
    date: "12 ม.ค. 2025",
    category: "เคล็ดลับ",
    readTime: "7 นาที",
  },
  {
    id: 3,
    title: "รีวิวหนังสือ: เรื่องราวที่เปลี่ยนชีวิต",
    excerpt: "รีวิวหนังสือที่ได้รับความนิยมและมีผลกระทบต่อผู้อ่านมากมาย พร้อมแนะนำให้คุณได้รู้จัก",
    author: "นักรีวิว",
    date: "10 ม.ค. 2025",
    category: "รีวิว",
    readTime: "6 นาที",
  },
  {
    id: 4,
    title: "ประวัติศาสตร์ของสำนักพิมพ์ Stranger's Book",
    excerpt: "ย้อนกลับไปดูประวัติศาสตร์และพัฒนาการของสำนักพิมพ์เรา ตั้งแต่เริ่มต้นจนถึงปัจจุบัน",
    author: "ทีมงาน",
    date: "8 ม.ค. 2025",
    category: "เกี่ยวกับเรา",
    readTime: "8 นาที",
  },
  {
    id: 5,
    title: "หนังสือที่แนะนำสำหรับผู้เริ่มต้นอ่าน",
    excerpt: "คัดเลือกหนังสือที่เหมาะสำหรับผู้ที่เพิ่งเริ่มต้นการอ่าน หรือต้องการหาหนังสือดีๆ มาอ่าน",
    author: "บรรณารักษ์",
    date: "5 ม.ค. 2025",
    category: "แนะนำ",
    readTime: "4 นาที",
  },
  {
    id: 6,
    title: "การสร้างนิสัยการอ่านหนังสือ",
    excerpt: "วิธีสร้างนิสัยการอ่านหนังสือให้เป็นส่วนหนึ่งของชีวิตประจำวัน และประโยชน์ที่คุณจะได้รับ",
    author: "โค้ชการอ่าน",
    date: "3 ม.ค. 2025",
    category: "เคล็ดลับ",
    readTime: "6 นาที",
  },
];

const books: Book[] = [
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    originalPrice: 399,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
  },
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
  },
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    originalPrice: 399,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
  },
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    originalPrice: 399,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
  },
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
  },
];

export default function Home() {
  const handleBlogClick = (blog: BlogPost) => {
    console.log("Blog clicked:", blog);
    // TODO: Navigate to blog detail page
  };

  const handleBookClick = (book: Book) => {
    console.log("Book clicked:", book);
    // TODO: Navigate to book detail page
  };

  return (
    <div class="w-full">
      <Carousel items={carouselItems} autoPlay={true} interval={5000} />
      <BookSection
        books={books}
        title="หนังสือแนะนำ"
        subtitle="หนังสือแนะนำที่คุณควรอ่าน"
        onBookClick={handleBookClick}
        backgroundColor="bg-white"
        isDarkBackground={false}
      />
      <BlogSection
        blogs={blogPosts}
        title="บทความล่าสุด"
        subtitle="ติดตามข่าวสารและบทความที่น่าสนใจจาก Stranger's Book"
        columns={3}
        onBlogClick={handleBlogClick}
      />
    </div>
  );
}