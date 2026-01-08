import { A } from "@solidjs/router";
import { ArrowLeft } from "lucide-solid";

export default function NotFound() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div class="mb-8 animate-fade-in">
          <img
            src="/chidahp.webp"
            width="80"
            height="80"
            alt="ChiDahp Logo"
            class="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-lg"
          />
          <h1 class="text-2xl font-bold text-amber-900 mb-2">สำนักพิมพ์ชี้ดาบ</h1>
        </div>

        {/* 404 Error */}
        <div class="mb-12 animate-slide-up">
          <div class="relative">
            <h1 class="text-8xl md:text-9xl font-bold text-amber-600 mb-4 opacity-20">404</h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-3xl md:text-4xl font-bold text-amber-900">ไม่พบหน้าที่คุณต้องการ</h2>
            </div>
          </div>
          <p class="text-lg text-amber-800 mt-6 leading-relaxed">
            ขออภัย หน้าที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปที่อื่นแล้ว
          </p>
        </div>


        {/* Back to Home Button */}
        <div class="animate-fade-in-delay">
          <A 
            href="/" 
            class="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            กลับไปหน้าแรก
          </A>
        </div>
      </div>
    </div>
  );
}
