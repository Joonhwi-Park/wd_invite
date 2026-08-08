import { useState } from 'react';
import BgmPlayer from './components/BgmPlayer';
import poster1 from './image/poster1.jpg';
import Gallery from './components/Gallery'; // 컴포넌트 경로에 맞게 조정해 주세요.

export default function App() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showGroomParents, setShowGroomParents] = useState(false);
  const [showBrideParents, setShowBrideParents] = useState(false);
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    

    
    <div className="min-h-screen bg-[#F7F5F0] flex justify-center text-[#2A2A2A] font-serif antialiased">
      {/* 모바일 캔버스 */}
      <main className="w-full max-w-md bg-[#FFFDF9] min-h-screen shadow-2xl overflow-hidden flex flex-col my-0 sm:my-8 border-x border-[#EFEBE1]">
        
        {/* 커버 / 헤더 */}
        <section className="px-0 pt-0 pb-16 text-center border-b border-[#EFEBE1]">
          <div className="w-full overflow-hidden bg-[#F7F5F0]">
            <img
              src={poster1}
              alt="Poster 1"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="px-8 pt-16">
            <BgmPlayer />
            {/* 1. 상단 라틴어/영문 메인 타이틀 */}
            <h1 className="font-english text-4xl tracking-[0.25em] text-[#2C251E] font-light mb-12">
              INVITÉ
            </h1>

  {/* 2. 수직 레이아웃 (날짜 - 수직선 - 이름 - 장소) */}
  <div className="flex flex-col items-center space-y-8">
    
    {/* 날짜 & 시간 구역 */}
    <div className="flex flex-col items-center leading-relaxed text-[#3D3731]">
      <span className="font-english text-sm tracking-[0.25em] uppercase text-[#6B5E52] mb-1">
        SATURDAY
      </span>
      <span className="font-english text-lg tracking-[0.2em] font-medium text-[#2C251E]">
        OCTOBER 24<sup className="text-xs font-light tracking-normal -top-1 ml-0.5">TH</sup>
      </span>
      <span className="font-english text-sm tracking-[0.2em] text-[#6B5E52] mt-1">
        11 : 00 AM
      </span>
    </div>

    {/* 3. 중앙 수직 구분선 */}
    <div className="w-[1px] h-18 bg-[#D8D0C3]" />

    {/* 4. 신랑 & 신부 이름 (자간을 넉넉히 벌린 수직 배치) */}
    <div className="flex flex-col items-center space-y-3 text-[#1A1A1A]">
      <div className="text-lg tracking-[0.6em] font-medium pl-[0.6em]">
        박 준 휘
      </div>
      <div className="text-lg tracking-[0.6em] font-medium pl-[0.6em]">
        송 윤 희
      </div>
    </div>

    {/* 5. 하단 예식장 위치 (작고 은은한 폰트) */}
    <div className="pt-2 text-xs text-[#8C7A6B] tracking-wider">
      북서울꿈의숲 창녕위궁재사
    </div>

  </div>
</div>
</section>

        {/* 초대말 본문 */}
        <section className="px-8 py-14 text-center leading-[2.3] text-[0.95rem] text-[#3D3731]">
          <p className="mb-10 tracking-normal font-light">
            서로의 삶에 따뜻한 동반자가 되어<br />
            사랑과 신뢰로 한 가정을 이루려 합니다.<br />
            언제나 서로에게 가장 든든한 편이 되어주며,<br />
            변치 않는 사랑으로 행복하게 살겠습니다.<br />
            축복의 자리에 귀한 걸음 하시어<br />
            저희의 새로운 시작을 함께해 주세요.
          </p>

          
          <div className="mt-12 pt-10 border-t border-[#F0EBE1] text-center text-[1rem] space-y-3">
            <div className="mx-auto max-w-xs">
              <span className="text-sm text-[#665C52]">박 훈 · 오정희</span>
              <span className="text-[#9E9082] mx-2">의 장남</span>
              <span className="font-semibold text-[#1A1A1A]">박준휘</span>
            </div>

            <div className="mx-auto max-w-xs">
              <span className="text-sm text-[#665C52]">송기호 · 박선숙</span>
              <span className="text-[#9E9082] mx-2">의 차녀</span>
              <span className="font-semibold text-[#1A1A1A]">송윤희</span>
            </div>
          </div>

          {/* 일시 및 장소 */}
          <div className="mt-12 bg-[#F9F7F2] py-6 px-4 rounded-sm border border-[#ECE6DA]">
            <p className="font-english text-[1.05rem] text-[#2C251E] tracking-tight">
              2026년 10월 24일 토요일 오전 11시
            </p>
            <p className="text-[0.95rem] text-[#63564A] mt-1 font-medium">
              북서울꿈의숲 창녕위궁재사
            </p>
          </div>
        </section>
        {/* 갤러리 컴포넌트 */}
      <Gallery />

        {/* 오시는 길 (실물 청첩장 정보 복원) */}
        <section className="px-8 py-14 border-t border-[#EFEBE1] text-center">
          <h2 className="font-english text-xl tracking-[0.15em] text-[#6B5E52] mb-1">
            Venue Directions
          </h2>
          <p className="text-sm tracking-[0.2em] text-[#8C7A6B] mb-6">오시는 길</p>
          
          <p className="text-xs text-[#736558] mb-8 bg-[#F9F7F2] py-2 px-3 inline-block rounded-sm border border-[#EAE3D5]">
            서울특별시 강북구 월계로 173
          </p>

{/* 지도 및 길찾기 섹션 */}
<div className="mb-8">
  {/* 지도 이미지 구역 */}
  <div className="aspect-[4/2] bg-[#F2EDE4] rounded-sm flex items-center justify-center border border-[#E8E2D5] overflow-hidden mb-3">
    <img 
      src="/image/location.jpg" 
      alt="오시는 길 약도" 
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-center"
    />
  </div>

  {/* 내비게이션 / 지도 바로가기 버튼 3개 (클래식 모노톤 스타일) */}
  <div className="grid grid-cols-3 gap-2 text-xs">
    {/* 카카오맵 */}
    <a
      href="https://map.kakao.com/link/search/서울특별시 강북구 월계로 173"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 py-2.5 bg-transparent text-[#5C5045] font-medium rounded-sm border border-[#DDD4C5] hover:bg-[#F4EFE6] transition shadow-xs"
    >
      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#FEE500] inline-block shrink-0" />
      <span>카카오맵</span>
    </a>

    {/* 네이버 지도 */}
    <a
      href="https://m.map.naver.com/search2/search.naver?query=서울특별시 강북구 월계로 173"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 py-2.5 bg-transparent text-[#5C5045] font-medium rounded-sm border border-[#DDD4C5] hover:bg-[#F4EFE6] transition shadow-xs"
    >
      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#03C75A] inline-block shrink-0" />
      <span>네이버지도</span>
    </a>

    {/* Tmap 내비게이션 */}
    <a
      href="https://tmap.co.kr/tmap2/mobile/route.jsp?name=서울특별시 강북구 월계로 173"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 py-2.5 bg-transparent text-[#5C5045] font-medium rounded-sm border border-[#DDD4C5] hover:bg-[#F4EFE6] transition shadow-xs"
    >
      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#0066FF] inline-block shrink-0" />
      <span>티맵</span>
    </a>
  </div>
</div>

          {/* 대중교통 상세 안내 */}
          <div className="text-left text-xs leading-relaxed text-[#4A423A] space-y-6 bg-[#F9F7F2] p-6 rounded-sm border border-[#ECE6DA]">
            <div>
              <p className="font-semibold text-[#2A231C] text-sm mb-1">SUBWAY</p>
              <p className="text-[#665B50]">4호선 미아사거리역 2번 출구 (도보 30분)</p>
            </div>

            <div>
              <p className="font-semibold text-[#2A231C] text-sm mb-1">BUS</p>
              <p className="text-[#665B50] font-medium">북서울꿈의숲 정류장 하차</p>
              <p className="text-[#807264] mt-0.5">강북09, 강북11</p>
            </div>

            <div>
              <p className="font-semibold text-[#2A231C] text-sm mb-1">CAR PARK</p>
              <p className="text-[#665B50]">북서울꿈의숲 동문주차장 / 서문주차장</p>
            </div>
          </div>
        </section>

{/* 마음 전하실 곳 (계좌번호) */}
<section className="px-6 sm:px-8 py-12 border-t border-[#EFEBE1] bg-[#F9F7F2]">
  <h2 className="font-english text-lg tracking-[0.15em] text-[#6B5E52] text-center mb-6">
    Account Number
  </h2>
  <p className="text-xs text-[#807264] text-center mb-6 leading-relaxed">
    축복의 마음을 담아 전해주실 수 있도록<br />계좌번호를 함께 안내해 드립니다.<br />
  </p>

  <div className="space-y-3 text-xs">
    {/* 신랑측 */}
    <div className="bg-white p-3.5 sm:p-4 rounded-sm border border-[#EAE3D5] shadow-sm">
      <div className="flex justify-between items-center">
        <div className="min-w-0 mr-2">
          <span className="text-[#8C7A6B] block text-[0.7rem] mb-0.5">신랑측 계좌</span>
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            <span className="font-semibold text-[#2C251E] text-sm shrink-0">농협은행</span>
            <span className="font-english text-[#2C251E] text-xs sm:text-sm tracking-normal xs:tracking-[0.05em] sm:tracking-[0.1em] whitespace-nowrap">
              352-0637-4433-03
            </span>
          </div>
          <span className="text-[#7A6C5F] block mt-0.5">예금주: 박준휘</span>
        </div>
        <button 
          onClick={() => handleCopy('3520637443303', 'groom')}
          className="px-2.5 py-1.5 bg-[#F4EFE6] text-[#5C5045] rounded-sm hover:bg-[#E8DFD1] transition border border-[#DDD4C5] shrink-0 text-xs"
        >
          {copiedAccount === 'groom' ? '복사됨' : '복사'}
        </button>
      </div>

      {/* 신랑 부모님 계좌 토글 버튼 */}
      <div className="mt-3 pt-2.5 border-t border-[#F2EDE4]">
        <button
          onClick={() => setShowGroomParents(!showGroomParents)}
          className="w-full flex items-center justify-between text-[0.75rem] text-[#8C7A6B] hover:text-[#5C5045] transition py-0.5"
        >
          <span>신랑 측 부모님 계좌 보기</span>
          <span className="text-[0.65rem]">{showGroomParents ? '▲ 접기' : '▼ 펼치기'}</span>
        </button>

        {/* 부모님 계좌 펼침 영역 */}
        {showGroomParents && (
          <div className="mt-2.5 space-y-2 bg-[#FAF8F5] p-2.5 rounded-sm border border-[#EFEBE1]">
            {/* 혼주 1 (예: 아버님) */}
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-[#8C7A6B] block text-[0.65rem]">아버님</span>
                <span className="font-semibold text-[#2C251E] text-xs">은행명 </span>
                <span className="font-english text-[#2C251E] text-xs whitespace-nowrap">000-0000-0000-00</span>
                <span className="text-[#7A6C5F] block text-[0.7rem]">예금주: 박 훈 </span>
              </div>
              <button
                onClick={() => handleCopy('00000000000000', 'groom_father')}
                className="px-2 py-1 bg-white text-[#5C5045] rounded-sm hover:bg-[#F4EFE6] transition border border-[#DDD4C5] text-[0.7rem] shrink-0"
              >
                {copiedAccount === 'groom_father' ? '복사됨' : '복사'}
              </button>
            </div>

            {/* 혼주 2 (예: 어머님) */}
            <div className="flex justify-between items-center text-xs pt-2 border-t border-[#EFEBE1]">
              <div>
                <span className="text-[#8C7A6B] block text-[0.65rem]">어머님</span>
                <span className="font-semibold text-[#2C251E] text-xs">은행명 </span>
                <span className="font-english text-[#2C251E] text-xs whitespace-nowrap">000-0000-0000-00</span>
                <span className="text-[#7A6C5F] block text-[0.7rem]">예금주: 오정희 </span>
              </div>
              <button
                onClick={() => handleCopy('00000000000000', 'groom_mother')}
                className="px-2 py-1 bg-white text-[#5C5045] rounded-sm hover:bg-[#F4EFE6] transition border border-[#DDD4C5] text-[0.7rem] shrink-0"
              >
                {copiedAccount === 'groom_mother' ? '복사됨' : '복사'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* 신부측 */}
    <div className="bg-white p-3.5 sm:p-4 rounded-sm border border-[#EAE3D5] shadow-sm">
      <div className="flex justify-between items-center">
        <div className="min-w-0 mr-2">
          <span className="text-[#8C7A6B] block text-[0.7rem] mb-0.5">신부측 계좌</span>
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            <span className="font-semibold text-[#2C251E] text-sm shrink-0">국민은행</span>
            <span className="font-english text-[#2C251E] text-xs sm:text-sm tracking-normal xs:tracking-[0.05em] sm:tracking-[0.1em] whitespace-nowrap">
              289501-00-027526
            </span>
          </div>
          <span className="text-[#7A6C5F] block mt-0.5">예금주: 송윤희</span>
        </div>
        <button 
          onClick={() => handleCopy('28950100027526', 'bride')}
          className="px-2.5 py-1.5 bg-[#F4EFE6] text-[#5C5045] rounded-sm hover:bg-[#E8DFD1] transition border border-[#DDD4C5] shrink-0 text-xs"
        >
          {copiedAccount === 'bride' ? '복사됨' : '복사'}
        </button>
      </div>

      {/* 신부 부모님 계좌 토글 버튼 */}
      <div className="mt-3 pt-2.5 border-t border-[#F2EDE4]">
        <button
          onClick={() => setShowBrideParents(!showBrideParents)}
          className="w-full flex items-center justify-between text-[0.75rem] text-[#8C7A6B] hover:text-[#5C5045] transition py-0.5"
        >
          <span>신부 측 부모님 계좌 보기</span>
          <span className="text-[0.65rem]">{showBrideParents ? '▲ 접기' : '▼ 펼치기'}</span>
        </button>

        {/* 부모님 계좌 펼침 영역 */}
        {showBrideParents && (
          <div className="mt-2.5 space-y-2 bg-[#FAF8F5] p-2.5 rounded-sm border border-[#EFEBE1]">
            {/* 혼주 1 (예: 아버님) */}
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-[#8C7A6B] block text-[0.65rem]">아버님</span>
                <span className="font-semibold text-[#2C251E] text-xs">농협은행 </span>
                <span className="font-english text-[#2C251E] text-xs whitespace-nowrap">352-1446-9857-03</span>
                <span className="text-[#7A6C5F] block text-[0.7rem]">예금주: 송기호</span>
              </div>
              <button
                onClick={() => handleCopy('3521446985703', 'bride_father')}
                className="px-2 py-1 bg-white text-[#5C5045] rounded-sm hover:bg-[#F4EFE6] transition border border-[#DDD4C5] text-[0.7rem] shrink-0"
              >
                {copiedAccount === 'bride_father' ? '복사됨' : '복사'}
              </button>
            </div>

            {/* 혼주 2 (예: 어머님) */}
            <div className="flex justify-between items-center text-xs pt-2 border-t border-[#EFEBE1]">
              <div>
                <span className="text-[#8C7A6B] block text-[0.65rem]">어머님</span>
                <span className="font-semibold text-[#2C251E] text-xs">은행명 </span>
                <span className="font-english text-[#2C251E] text-xs whitespace-nowrap">681101-01-257300</span>
                <span className="text-[#7A6C5F] block text-[0.7rem]">예금주: 박선숙 </span>
              </div>
              <button
                onClick={() => handleCopy('68110101257300', 'bride_mother')}
                className="px-2 py-1 bg-white text-[#5C5045] rounded-sm hover:bg-[#F4EFE6] transition border border-[#DDD4C5] text-[0.7rem] shrink-0"
              >
                {copiedAccount === 'bride_mother' ? '복사됨' : '복사'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  <p className="text-xs text-[#807264] text-center mb-6 leading-relaxed">
     <br />화환은 정중히 사양하오니 <br />너그러운 마음으로 양해 부탁드립니다.
  </p>
</section>

        <footer className="py-8 text-center text-[0.7rem] text-[#9E9082] bg-[#F4EFE6] border-t border-[#EAE3D5]">
          © 2026 Joonhwi & Yoonhee. All rights reserved. 
        </footer>
      </main>
    </div>
  );
}