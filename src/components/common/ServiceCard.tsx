import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '../ThreeDCard';
import { GlowingEffect } from '../ui/GlowingEffect';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  extendedContent: string;
  galleryImages: string[];
}

interface ServiceCardProps {
  service: Service;
  language: 'tr' | 'en';
  isOdd: boolean;
  index: number;
  onDetailClick: () => void;
  onContactClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  language,
  isOdd,
  index,
  onDetailClick,
  onContactClick
}) => {
  const Icon = service.icon;

  return (
    <div
      className={`flex flex-col ${isOdd ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
      style={{
        animation: 'fade-in-up 0.8s ease-out',
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex-1 w-full">
        <CardContainer className="w-full">
          <CardBody className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 hover:border-white/20 transition-all duration-500 w-full h-full relative">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              variant="default"
            />
            <CardItem translateZ="50" className="w-full">
              <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
            </CardItem>

            <CardItem translateZ="60" className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.title}
              </h2>
            </CardItem>

            <CardItem translateZ="40" className="w-full">
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>
            </CardItem>

            <CardItem translateZ="30" className="w-full">
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {language === 'tr' ? 'Temel Özellikler' : 'Key Benefits'}
                </h3>
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mt-2 mr-3 flex-shrink-0`}></div>
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardItem>

            <CardItem translateZ={20} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={onDetailClick}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg`}
                >
                  {language === 'tr' ? 'Daha Detaylı İncele' : 'View More Details'}
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={onContactClick}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg"
                >
                  {language === 'tr' ? 'Özel Teklif İsteyin' : 'Request Custom Quote'}
                </CardItem>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="flex-1 w-full">
        <CardContainer className="w-full">
          <CardBody className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 w-full h-full relative">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              variant="default"
            />
            <CardItem translateZ="80" className="w-full">
              <div className={`aspect-video rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white font-bold text-2xl overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-center px-4">
                    {language === 'tr' ? 'Görsel Önizleme' : 'Visual Preview'}
                  </span>
                </div>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};
