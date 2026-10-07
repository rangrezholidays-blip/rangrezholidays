import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Heart,
  Eye,
  Instagram,
  Volume2,
  VolumeX,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { INSTA_REELS } from '../data/reviewsAndReelsData';
import { InstaReel } from '../types';

interface InstaReelsSectionProps {
  onPlanTrip: (tourTag?: string) => void;
}

export const InstaReelsSection: React.FC<InstaReelsSectionProps> = ({ onPlanTrip }) => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [likedMap, setLikedMap] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tags = ['all', 'Golden Triangle', 'Rajasthan', 'Char Dham', 'Taj Mahal'];

  const filteredReels = selectedTag === 'all'
    ? INSTA_REELS
    : INSTA_REELS.filter((r) => r.tourTag.toLowerCase().includes(selectedTag.toLowerCase()));

  const activeReel: InstaReel | null = activeReelIndex !== null ? filteredReels[activeReelIndex] : null;

  // When active reel changes, start playback
  useEffect(() => {
    if (activeReelIndex !== null) {
      setIsPlaying(true);
      setProgress(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay with audio was blocked by browser policy; fallback to muted autoplay
            setIsMuted(true);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }
    }
  }, [activeReelIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') {
        setActiveReelIndex(null);
      } else if (e.key === 'ArrowRight') {
        nextReel();
      } else if (e.key === 'ArrowLeft') {
        prevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, isPlaying]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 700);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const toggleLike = (reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const nextReel = () => {
    if (activeReelIndex !== null && activeReelIndex < filteredReels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    } else {
      setActiveReelIndex(0);
    }
  };

  const prevReel = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    } else if (activeReelIndex !== null) {
      setActiveReelIndex(filteredReels.length - 1);
    }
  };

  return (
    <section id="traveler-reels" className="py-14 sm:py-20 bg-white border-y border-[#EADBDF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - MakeMyTrip Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F05A28]/10 to-[#FFA000]/10 text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>Watch Live Video Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
              Real Traveler Reels <span className="text-[#F05A28]">#RangrezMoments</span>
            </h2>
            <p className="mt-2 text-sm text-[#634857] max-w-2xl">
              Click any reel to play authentic moments captured by travelers across Agra, Jaisalmer, Kedarnath, Udaipur, and Jaipur.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/rangrezholidays"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EADBDF] hover:border-[#F05A28] text-xs font-bold text-[#4A0E35] hover:text-[#F05A28] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#F05A28]" />
              <span>Follow @rangrezholidays</span>
            </a>
          </div>
        </div>

        {/* Tag Filters (MakeMyTrip Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#4A0E35] text-white border-[#4A0E35] shadow-xs'
                  : 'bg-[#FAF4F8] text-[#735467] border-[#EADBDF] hover:border-[#F05A28]'
              }`}
            >
              {tag === 'all' ? '🎬 All Stories' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Reels Carousel Grid (6 Items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredReels.map((reel, index) => {
            const isLiked = likedMap[reel.id];
            const isHovered = hoveredCardIndex === index;

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelIndex(index)}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-black cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 ring-1 ring-black/10 hover:ring-2 hover:ring-[#F05A28]"
              >
                {/* Static Thumbnail */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className={`w-full h-full object-cover transition-transform duration-700 brightness-90 ${
                    isHovered ? 'scale-105 opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                />

                {/* Video Preview on Hover */}
                {reel.videoUrl && isHovered && (
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Layered Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Bar: Tour Tag & Play Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-[9px] font-bold bg-[#4A0E35]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 truncate max-w-[75%]">
                    {reel.tourTag}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#F05A28] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Live Reel Play Pill Indicator on Hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center ring-2 ring-white/60 group-hover:scale-110 transition-all opacity-80 group-hover:opacity-100">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white pointer-events-none">
                  <p className="text-[10px] text-white/85 font-medium truncate mb-0.5">
                    {reel.authorHandle}
                  </p>
                  <h4 className="text-[11px] font-bold leading-tight line-clamp-2 drop-shadow-sm mb-1.5">
                    {reel.title}
                  </h4>

                  {/* Views & Likes */}
                  <div className="flex items-center justify-between text-[10px] text-white/80 pt-1 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#FFA000]" />
                      <span>{reel.views}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleLike(reel.id, e)}
                      className="pointer-events-auto flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'
                        }`}
                      />
                      <span>{isLiked ? 'Liked' : reel.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Reel Viewer Modal with Real Video Playback */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
          onClick={() => setActiveReelIndex(null)}
        >
          {/* Previous Reel Navigation Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevReel();
            }}
            className="hidden md:flex p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all mr-4 cursor-pointer"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Reel Frame Container */}
          <div
            className="relative bg-[#1A0512] rounded-3xl overflow-hidden max-w-sm w-full aspect-[9/16] shadow-2xl border border-white/20 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HTML5 Video Element with Native Playback */}
            <video
              ref={videoRef}
              src={activeReel.videoUrl || 'https://ik.imagekit.io/demo/sample-video.mp4'}
              poster={activeReel.thumbnail}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlayPause}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Gradient Overlays for readable text */}
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-auto cursor-pointer"
            />

            {/* Top Progress Bar (Instagram Reel Style) */}
            <div className="relative z-20 px-3 pt-3">
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFA000] transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Top Modal Controls */}
            <div className="relative z-20 p-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold bg-[#F05A28] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Guest Reel</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Audio Mute/Unmute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors cursor-pointer flex items-center gap-1.5"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span className="text-[10px] font-bold pr-1">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold pr-1">Sound ON</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveReelIndex(null)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors cursor-pointer"
                  title="Close Reel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Animated Flash Icon on Click (Play / Pause) */}
            {showCenterIcon && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white scale-110 transition-transform">
                  {isPlaying ? (
                    <Play className="w-8 h-8 fill-white ml-0.5" />
                  ) : (
                    <Pause className="w-8 h-8 fill-white" />
                  )}
                </div>
              </div>
            )}

            {/* Paused Overlay State if User Explicitly Paused */}
            {!isPlaying && !showCenterIcon && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center ring-4 ring-white/30 hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Bottom Reel Caption & Concierge Action */}
            <div className="relative z-20 p-4 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F05A28] to-[#FFA000] flex items-center justify-center font-bold text-xs text-white shadow-xs">
                    {activeReel.authorHandle.slice(1, 3).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{activeReel.authorHandle}</p>
                    <p className="text-[10px] text-white/80 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#FFA000]" />
                      <span>{activeReel.location}</span>
                    </p>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => toggleLike(activeReel.id)}
                  className="flex flex-col items-center gap-0.5 text-white cursor-pointer hover:scale-105 transition-transform"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      likedMap[activeReel.id] ? 'text-rose-500 fill-rose-500' : 'text-white'
                    }`}
                  />
                  <span className="text-[10px] font-bold">
                    {likedMap[activeReel.id] ? 'Liked' : activeReel.likes}
                  </span>
                </button>
              </div>

              <p className="text-xs text-white/90 leading-relaxed line-clamp-2">
                {activeReel.caption}
              </p>

              {/* Instant Trip Booking / Custom Quote Trigger */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const tag = activeReel.tourTag;
                    setActiveReelIndex(null);
                    onPlanTrip(tag);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] hover:brightness-110 text-[#24061A] text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book {activeReel.tourTag}</span>
                </button>

                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
              </div>
            </div>
          </div>

          {/* Next Reel Navigation Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextReel();
            }}
            className="hidden md:flex p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all ml-4 cursor-pointer"
            aria-label="Next reel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

