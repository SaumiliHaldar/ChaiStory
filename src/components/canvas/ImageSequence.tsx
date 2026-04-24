import React, { useEffect, useRef, useState } from 'react';

interface ImageSequenceProps {
  progress: number;
  frameCount: number;
  imagePath: string; // e.g., '/chai-hero/ezgif-frame-'
  imageExtension: string; // e.g., '.jpg'
  onLoadProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

const ImageSequence: React.FC<ImageSequenceProps> = ({
  progress,
  frameCount,
  imagePath,
  imageExtension,
  onLoadProgress,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `${imagePath}${frameNumber}${imageExtension}`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (onLoadProgress) {
          onLoadProgress(loadedCount / frameCount);
        }
        if (loadedCount === frameCount) {
          setIsReady(true);
          if (onLoaded) onLoaded();
        }
      };
      
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameCount, imagePath, imageExtension]);

  // Draw frame on canvas
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Calculate current frame index (1 to frameCount)
    // We use a slightly more complex calculation to allow for blending
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(progress * (frameCount - 1)))
    );

    const nextFrameIndex = Math.min(frameCount - 1, frameIndex + 1);
    const frameProgress = (progress * (frameCount - 1)) % 1;

    const currentImg = imagesRef.current[frameIndex];
    const nextImg = imagesRef.current[nextFrameIndex];

    if (currentImg && currentImg.complete) {
      // Draw current frame
      const render = (img: HTMLImageElement, alpha: number = 1) => {
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.globalAlpha = alpha;
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      // Implementation of blending (cross-fade)
      // To prevent flickering (seeing the background through alpha), 
      // we draw the current frame fully first, then the next frame with alpha.
      render(currentImg, 1);
      
      if (frameProgress > 0 && nextImg && nextImg.complete) {
        render(nextImg, frameProgress);
      }
    }
  }, [progress, isReady, frameCount]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-canvas-container">
      <canvas ref={canvasRef} />
      {!isReady && (
        <div className="loading-overlay">
          <div className="flex flex-col items-center">
            <div className="w-48 h-[1px] bg-cream/10 relative overflow-hidden mb-4">
              <div 
                className="absolute inset-0 bg-ember transition-transform duration-300" 
                style={{ transform: `translateX(${(imagesLoaded / frameCount) * 100 - 100}%)` }}
              />
            </div>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/40">
              Steeping... {Math.round((imagesLoaded / frameCount) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSequence;
