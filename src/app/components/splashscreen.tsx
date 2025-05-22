export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-4">
      <img
        src="/jlogo.webp"
        alt="Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6 animate-pulse"
      />
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700">Loading...</p>
    </div>
  );
}
