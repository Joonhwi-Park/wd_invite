import { useEffect } from 'react';

// 카카오 SDK 글로벌 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

// ⚠️ 1단계에서 복사한 본인의 JavaScript 키를 입력하세요!
const KAKAO_JS_KEY = 'a1aa9c8ba23dae4eb6c3f8817dd51f78';

export default function KakaoShareButton() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '신랑 박준휘 🤍 신부 송윤희',
        description: '10월 24일 오전 11시\n소중한 시작을 함께 축복해 주세요.',
        // ⚠️ 세로 사진의 https:// 전체 주소를 입력합니다 (4:3 또는 3:4 비율 세로 사진 권장)
        imageUrl: 'https://joonhwi-park.github.io/wd_invite/image/poster1.jpg',
        link: {
          mobileWebUrl: 'https://joonhwi-park.github.io/wd_invite/',
          webUrl: 'https://joonhwi-park.github.io/wd_invite/',
        },
      },
      buttons: [
        {
          title: '모바일 청첩장 보기',
          link: {
            mobileWebUrl: 'https://joonhwi-park.github.io/wd_invite/',
            webUrl: 'https://joonhwi-park.github.io/wd_invite/',
          },
        },
      ],
    });
  };

return (
  <button
    onClick={handleShare}
    className="w-full py-3.5 bg-[#FAF8F5] text-[#3D352E] font-serif text-sm rounded-lg flex items-center justify-center gap-2 border border-[#E8E2D5] shadow-sm hover:bg-[#F2EDE4] active:scale-[0.99] transition-all cursor-pointer"
  >
    {/* 카카오 아이콘 */}
    <div className="w-5 h-5 rounded-full bg-[#FEE500] flex items-center justify-center">
      <svg className="w-3 h-3 fill-[#191919]" viewBox="0 0 24 24">
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.9 1.9 5.4 4.8 6.7l-1.2 4.5c-.1.4.3.7.6.5l5.3-3.5c.2 0 .3.1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
      </svg>
    </div>
    <span className="tracking-wide">카카오톡으로 공유하기</span>
  </button>
);
}