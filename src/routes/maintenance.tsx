export default function Maintainance() {
  return (
    <main class="min-h-screen flex flex-col items-center justify-center bg-dark-orange-mysterious p-4 relative overflow-hidden">
      {/* Background subtle glow effects */}
      <div class="absolute inset-0 bg-mysterious-glow opacity-20"></div>
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-800/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
      
      <div class="text-center max-w-2xl mx-auto relative z-10">
        {/* Logo */}
        <div class="mb-8 flex justify-center">
          <img 
            src="/stranger-shop.png" 
            alt="Stranger Shop Logo" 
            class="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto animate-fade-in drop-shadow-logo"
          />
        </div>
      </div>
    </main>
  );
}

