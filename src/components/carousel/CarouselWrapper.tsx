import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CardCarousel from '../CardCarousel'

export interface Slide {
  id: string
  title: string
  description?: string
  image?: string
  audioSrc?: string
  duration?: string
}

interface CarouselWrapperProps {
  items: Slide[]
  isDarkMode?: boolean
  // optional prop passthrough for react-material-ui-carousel
  autoPlay?: boolean
  interval?: number
  navButtonsAlwaysVisible?: boolean
  onItemClick?: (id: string) => void
}

/**
 * A thin wrapper around react-material-ui-carousel that renders MUI Cards
 * while allowing simple Tailwind-based visual tweaks.
 *
 * Usage:
 * import CarouselWrapper, { Slide } from './carousel/CarouselWrapper'
 * <CarouselWrapper items={slides} />
 */
const CarouselWrapper: React.FC<CarouselWrapperProps> = ({
  items,
  isDarkMode = false,
  autoPlay = false,
  interval = 4000,
  navButtonsAlwaysVisible = false,
  onItemClick,
}) => {
  if (!items || items.length === 0) return null

  return (
    <div className="w-full flex justify-center">
      {/* debug wrapper so the carousel area is visually obvious while troubleshooting */}
      <div className="w-full max-w-4xl" style={{ border: '1px dashed rgba(0,0,0,0.08)', padding: 8, background: isDarkMode ? 'rgba(255,255,255,0.02)' : undefined }}>
        <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 12, color: isDarkMode ? '#ddd' : '#444' }}>
          Carousel (debug) — if you cannot see slides below, increase window width or check CSS
        </div>

        <Carousel
          autoPlay={autoPlay}
          interval={interval}
          navButtonsAlwaysVisible={navButtonsAlwaysVisible}
          animation="slide"
          indicators={true}
        >
          {items.map((item) => (
            // ensure each slide has visible height and border so it's obvious in UI
            <div key={item.id} className="mx-2" style={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%' }}>
                <CardCarousel
                  cards={[
                    {
                      id: item.id,
                      title: item.title,
                      description: item.description || '',
                      icon: '📖',
                      color: 'blue',
                      audioSrc: item.audioSrc,
                      duration: item.duration,
                    },
                  ]}
                  isDarkMode={isDarkMode}
                  onCardClick={() => onItemClick?.(item.id)}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselWrapper
