import { useState, useRef, useEffect } from 'react';

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // 목표 볼륨 50%
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // 3초간 볼륨 5% -> 50% 페이드인 함수
  const startFadeIn = () => {
    if (!audioRef.current) return;

    const startVol = 0.05; // 시작 볼륨 5%
    const targetVol = 0.40; // 목표 볼륨 40%
    const duration = 3000;  // 3초 (3000ms)
    const intervalTime = 50; // 0.05초마다 업데이트
    const step = (targetVol - startVol) / (duration / intervalTime);

    // 초기값 세팅
    audioRef.current.volume = startVol;
    setVolume(startVol);

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) return;

      const currentVol = audioRef.current.volume;
      if (currentVol + step < targetVol) {
        const nextVol = currentVol + step;
        audioRef.current.volume = nextVol;
        setVolume(nextVol);
      } else {
        // 목표 볼륨(50%) 도달 시 타이머 종료
        audioRef.current.volume = targetVol;
        setVolume(targetVol);
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, intervalTime);
  };

  // 음원 재생 시도 함수
  const playAudioWithFadeIn = () => {
    if (!audioRef.current || isPlaying) return;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setShowVolumeBar(true);
      startFadeIn();
    }).catch(() => {
      // 자동 재생이 막혔을 경우: 사용자 첫 클릭/터치 시 재생되도록 이벤트 등록
      const handleFirstInteraction = () => {
        if (!audioRef.current) return;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowVolumeBar(true);
          startFadeIn();
        }).catch((e) => console.log("재생 오류:", e));

        // 한 번 실행 후 이벤트 제거
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction, { once: true });
      window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    });
  };

  // 페이지 마운트 시 자동 재생 시도
  useEffect(() => {
    playAudioWithFadeIn();

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // 수동 볼륨 조절 슬라이더 및 음소거 변경 반영
  useEffect(() => {
    if (audioRef.current && !fadeIntervalRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 메인 음악 버튼 수동 클릭 이벤트
  const toggleMusic = () => {
    if (!audioRef.current) return;

    // 페이드인 실행 중 버튼 누르면 페이드인 타이머 중지
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (!isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowVolumeBar(true);
        startFadeIn();
      }).catch((err) => console.log("BGM 재생 에러:", err));
    } else {
      // 이미 재생 중일 때 버튼을 누르면 음소거 토글
      setIsMuted(!isMuted);
    }
  };

  // 볼륨 슬라이더 값 변경
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}small_happyness.mp3`} loop />

      {/* 우측 상단 플로팅 컨트롤러 */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-center">
        <button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-[#2C251E]/80 backdrop-blur-md text-[#FFFDF9] shadow-lg flex items-center justify-center border border-[#8C7A6B]/30 hover:scale-105 active:scale-95 transition-all duration-300"
          title="배경음악 재생/음소거"
        >
          {!isPlaying ? (
            <svg className="w-4 h-4 fill-current opacity-80" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          ) : isMuted ? (
            <svg className="w-4 h-4 fill-current opacity-80 text-rose-300" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current animate-pulse text-emerald-300" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        {isPlaying && showVolumeBar && (
          <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-[#EAE3D5] flex flex-col items-center gap-1">
            <span className="text-[0.6rem] text-[#6B5E52] font-sans font-medium">
              {isMuted ? '음소거' : `${Math.round(volume * 100)}%`}
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-[#8C7A6B] cursor-pointer"
            />
          </div>
        )}
      </div>
    </>
  );
}