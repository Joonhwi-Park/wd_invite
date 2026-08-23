import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

// ⚠️ 실제 발급받으신 JavaScript 키
const KAKAO_JS_KEY = 'a1aa9c8ba23dae4eb6c3f8817dd51f78';

export default function KakaoShareButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. 이미 SDK가 로드되어 있는 경우 초기화
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      return;
    }

    // 2. 동적으로 script 태그 삽입하여 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };
    script.onerror = () => {
      console.error('카카오 SDK 스크립트 로드 실패');
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    const pageUrl = 'https://joonhwi-park.github.io/wd_invite/';

    // 초기화 상태 재확인
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }

    if (!window.Kakao) {
      copyLink(pageUrl);
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '신랑 박준휘 ❤️ 신부 송윤희',
          // 💡 줄바꿈(\n) 적용된 예식 상세 정보 (웨딩홀/시간 확인 후 필요시 텍스트 수정)
          description: '10월 24일 (토) 오전 11시\n북서울꿈의숲 창녕위궁재사',
          // ⚠️ public/image/poster1.jpg 실제 포스터 이미지 주소 연결
          imageUrl: 'https://joonhwi-park.github.io/wd_invite/image/poster1.jpg',
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
        buttons: [
          {
            title: '모바일 청첩장 보기',
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
        ],
      });
    } catch (error: any) {
      console.error('카카오 공유 오류:', error);
      alert(`공유 중 오류가 발생했습니다: ${error?.message || error}`);
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      alert('청첩장 링크가 복사되었습니다! 카카오톡에 붙여넣어 주세요.');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className="w-full py-3.5 bg-[#FAF8F5] text-[#3D352E] font-serif text-sm rounded-lg flex items-center justify-center gap-2 border border-[#E8E2D5] shadow-sm hover:bg-[#F2EDE4] active:scale-[0.99] transition-all cursor-pointer"
    >
      {/* 카카오 아이콘 */}
      <div className="w-5 h-5 rounded-full bg-[#FEE500] flex items-center justify-center shrink-0">
        <svg className="w-3 h-3 fill-[#191919]" viewBox="0 0 24 24">
          <path d="M12 3C6.5 3 2 6.6 2 11c0 2.9 1.9 5.4 4.8 6.7l-1.2 4.5c-.1.4.3.7.6.5l5.3-3.5c.2 0 .3.1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
        </svg>
      </div>
      <span className="tracking-wide">
        {copied ? '링크 복사 완료' : '카카오톡으로 공유하기'}
      </span>
    </button>
  );
}