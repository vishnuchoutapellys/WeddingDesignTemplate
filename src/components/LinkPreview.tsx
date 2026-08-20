import React from 'react';

type Props = {
  url: string;
  title: string;
  description?: string;
  image: string;
  domain?: string;
};

const LinkPreview: React.FC<Props> = ({ url, title, description, image, domain }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-2xl mx-auto block"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#e5e7eb]">
        <div className="relative">
          <img src={image} alt={title} className="w-full object-cover h-48 sm:h-56" />
          <div className="absolute left-4 right-4 bottom-4 bg-black/60 text-white p-3 rounded-md">
            <h3 className="text-sm sm:text-base font-semibold leading-tight">{title}</h3>
          </div>
        </div>

        <div className="p-3">
          {description && (
            <p className="text-[13px] text-[#374151] line-clamp-2">{description}</p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] text-[#6b7280]">{domain || new URL(url).hostname}</span>
            <span className="text-[12px] text-[#6b7280]">{new URL(url).hostname === domain ? '' : ''}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkPreview;
