type Props = {
  description?: string;
};

export default function VenueDescription({ description }: Props) {
  return (
    <div>
      <h3>Description</h3>
      <p className="leading-relaxed">
        {description?.trim() ? description : 'No description provided.'}
      </p>
    </div>
  );
}
