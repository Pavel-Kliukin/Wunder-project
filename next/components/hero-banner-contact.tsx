import Image from "next/image";

export const HeroBannerContact = () => {
  return (
    <div>
      <div className="mb-14 relative w-full h-[600px]">
        <Image
          width={1920}
          height={600}
          className="w-full h-full object-cover"
          src="/assets/wunder-people.jpg"
          alt="wunder people"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-primary-600 opacity-60"></div>
        {/* Add additional content here if needed */}
      </div>
    </div>
  );
};
