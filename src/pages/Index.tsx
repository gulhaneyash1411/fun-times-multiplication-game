
import MultiplicationGame from "@/components/MultiplicationGame";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Jungle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-green-300 to-yellow-200">
        {/* Animated jungle elements */}
        <div className="absolute inset-0">
          {/* Flying birds */}
          <div className="absolute top-10 left-0 animate-[fly_15s_linear_infinite]">
            <span className="text-4xl">🦜</span>
          </div>
          <div className="absolute top-20 left-0 animate-[fly_20s_linear_infinite_3s]">
            <span className="text-3xl">🦋</span>
          </div>
          <div className="absolute top-32 left-0 animate-[fly_18s_linear_infinite_6s]">
            <span className="text-4xl">🐦</span>
          </div>
          
          {/* Swaying trees */}
          <div className="absolute bottom-0 left-10 animate-[sway_4s_ease-in-out_infinite]">
            <span className="text-6xl">🌴</span>
          </div>
          <div className="absolute bottom-0 left-32 animate-[sway_3s_ease-in-out_infinite_1s]">
            <span className="text-8xl">🌳</span>
          </div>
          <div className="absolute bottom-0 right-20 animate-[sway_5s_ease-in-out_infinite_2s]">
            <span className="text-7xl">🌴</span>
          </div>
          <div className="absolute bottom-0 right-40 animate-[sway_4s_ease-in-out_infinite_0.5s]">
            <span className="text-6xl">🌲</span>
          </div>
          
          {/* Floating leaves */}
          <div className="absolute top-1/4 left-1/4 animate-[float_6s_ease-in-out_infinite]">
            <span className="text-2xl">🍃</span>
          </div>
          <div className="absolute top-1/3 right-1/4 animate-[float_8s_ease-in-out_infinite_2s]">
            <span className="text-3xl">🍃</span>
          </div>
          <div className="absolute top-1/2 left-1/3 animate-[float_7s_ease-in-out_infinite_4s]">
            <span className="text-2xl">🍃</span>
          </div>
          
          {/* Moving clouds */}
          <div className="absolute top-5 left-0 animate-[drift_25s_linear_infinite]">
            <span className="text-5xl opacity-70">☁️</span>
          </div>
          <div className="absolute top-12 left-0 animate-[drift_30s_linear_infinite_5s]">
            <span className="text-4xl opacity-60">☁️</span>
          </div>
          
          {/* Sun */}
          <div className="absolute top-8 right-8 animate-[glow_3s_ease-in-out_infinite]">
            <span className="text-6xl">☀️</span>
          </div>
        </div>
      </div>
      
      {/* Game content overlay */}
      <div className="relative z-10">
        <MultiplicationGame />
      </div>
    </div>
  );
};

export default Index;
