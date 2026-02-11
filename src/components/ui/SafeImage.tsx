import PlaceholderImage from '../../assets/placeholder_image.jpg';

type Props = {
  src?: string;
  alt: string;
  className?: string;
};

export default function SafeImage({ src, alt, className }: Props) {
  return (
    <img
      src={src || PlaceholderImage}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = PlaceholderImage;
      }}
    />
  );
}
