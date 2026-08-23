import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

// ⚠️ 본인의 실제 JavaScript 키를 입력하세요 (플랫폼 키에 있는 32자리)
const KAKAO_JS_KEY = 'a1aa9c8ba23dae4eb6c3f8817dd51f78';

export default function KakaoShareButton() {
  const [sdkReady, setSdkReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. 이미 SDK가 로드되어 있는 경우
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      setSdkReady(true);
      return;
    }

    // 2. SDK가 없으면 동적으로 script 태그를 삽입하여 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY);
        }
        setSdkReady(true);
      }
    };
    script.onerror = () => {
      console.error('카카오 SDK 스크립트 로드 실패');
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    const pageUrl = 'https://joonhwi-park.github.io/wd_invite/';

    // Kakao 객체 확인 및 초기화 재시도
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }

    if (!window.Kakao) {
      // SDK가 끝내 차단/실패된 경우 복사로 폴백
      copyLink(pageUrl);
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '신랑 박준휘 🤍 신부 송윤희',
          description: '소중한 시작을 함께 축복해 주세요.',
          // ⚠️ og-image.jpg 또는 공개된 실제 이미지 절대경로
          imageUrl: 'https://joonhwi-park.github.io/wd_invite/og-image.jpg',
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
