'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  discount?: number;
  condition?: string;
}

export default function ProductGallery({ images, name, discount = 0, condition = '' }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const nextImage = () => setSelectedIndex((i) => (i + 1) % images.length);
  const prevImage = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming || !mainImageRef.current) return;
    
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) });
    setZoomLevel(2.5);
  };

  const handleMouseLeave = () => {
    setZoomLevel(1);
    setZoomPosition({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown as EventListener);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown as EventListener);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <div className="relative">
      {/* Main Image Area - Shopee style: large left + vertical thumbnails right */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
        {/* Main Image Container with Zoom */}
        <div
          ref={mainImageRef}
          className="relative aspect-square overflow-hidden cursor-zoom-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <img
            src={images[selectedIndex]}
            alt={`${name} - Foto ${selectedIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${isZooming ? 'scale-105' : ''}`}
            style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, transform: `scale(${zoomLevel})` }}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}

          {/* Condition Badge */}
          {condition && (
            <span className={`absolute top-3 right-3 text-xs font-medium rounded-full px-2 py-0.5 ${
              condition === 'Sangat Baik' ? 'bg-rose-500 text-white' :
              condition === 'Like New' ? 'bg-emerald-500 text-white' :
              condition === 'Baik' ? 'bg-amber-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {condition}
            </span>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 hover:bg-white shadow-md transition-colors"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 hover:bg-white shadow-md transition-colors"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 hover:bg-white shadow-md transition-colors"
            aria-label="Buka galeri fullscreen"
          >
            <Maximize className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Foto ${i + 1}`}
                  aria-current={i === selectedIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          )}
        </div>

        {/* Vertical Thumbnails on the right (desktop only) */}
        {images.length > 1 && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-24 overflow-y-auto p-2 gap-2 flex flex-col">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex-shrink-0 relative h-20 w-full rounded-xl overflow-hidden border-2 transition-all ${
                  i === selectedIndex ? 'border-[#E17100]' : 'border-transparent hover:border-neutral-300'
                }`}
                aria-label={`Lihat foto ${i + 1}`}
                aria-current={i === selectedIndex ? 'true' : 'false'}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Horizontal Thumbnails (mobile / fallback) */}
      {images.length > 1 && (
        <div className="lg:hidden mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                i === selectedIndex ? 'border-[#E17100]' : 'border-transparent hover:border-neutral-300'
              }`}
              aria-label={`Lihat foto ${i + 1}`}
              aria-current={i === selectedIndex ? 'true' : 'false'}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 lg:left-8"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={images[selectedIndex]}
            alt={`${name} - Foto ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 lg:right-8"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
            aria-label="Tutup galeri"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
