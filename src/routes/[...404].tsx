import { A } from "@solidjs/router";
import { ArrowLeft } from "lucide-solid";

export default function NotFound() {
  return (
    <div class="min-h-screen bg-dark-orange-mysterious flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background subtle glow effects */}
      <div class="absolute inset-0 bg-mysterious-glow opacity-20"></div>
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-800/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
      
      <div class="max-w-2xl mx-auto text-center relative z-10">
        {/* Logo */}
        <div class="mb-8 animate-fade-in">
          <img
            src="/stranger-shop.png"
            alt="Stranger Shop Logo"
            class="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto mx-auto mb-4 drop-shadow-logo"
          />
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-shadow-mysterious">สำนักพิมพ์ Stranger's Book</h1>
        </div>

        {/* 404 Error */}
        <div class="mb-12 animate-slide-up">
          <div class="relative">
            <h1 class="text-8xl md:text-9xl font-bold text-orange-600/20 mb-4">404</h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-3xl md:text-4xl font-bold text-white text-shadow-mysterious">ไม่พบหน้าที่คุณต้องการ</h2>
            </div>
          </div>
          <p class="text-lg text-white/80 mt-6 leading-relaxed">
            ขออภัย หน้าที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปที่อื่นแล้ว
          </p>
        </div>

        {/* Back to Home Button */}
        <div class="animate-fade-in-delay">
          <A 
            href="/home" 
            class="group inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-glow-white"
          >
            <ArrowLeft class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            กลับไปหน้าแรก
          </A>
        </div>
      </div>
    </div>
  );
}
