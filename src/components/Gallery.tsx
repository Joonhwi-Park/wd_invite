
// public/image/ 폴더의 이미지 참조
const galleryImages = [
  { src: '/image/IMG_1.jpg', alt: '갤러리 사진 1' },
  { src: '/image/IMG_2.jpg', alt: '갤러리 사진 2' },
  { src: '/image/IMG_3.JPG', alt: '갤러리 사진 3' },
  { src: '/image/IMG_4.JPG', alt: '갤러리 사진 4' },
  { src: '/image/IMG_5.JPG', alt: '갤러리 사진 5' },
  { src: '/image/IMG_6.JPG', alt: '갤러리 사진 6' },
];

export default function Gallery() {
  return (
    <section className="px-6 py-12 border-t border-[#EFEBE1] text-center">
      <h2 className="font-english text-xl tracking-[0.15em] text-[#6B5E52] mb-8">
        Gallery
      </h2>

      {/* 6장: 모바일 2열(3행), 태블릿/PC 3열(2행) 정렬 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {galleryImages.map((img, index) => (
          <div 
            key={index} 
            className="relative aspect-square bg-[#F2EDE4] rounded-sm overflow-hidden border border-[#E8E2D5] group cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width={600}
              height={600}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}