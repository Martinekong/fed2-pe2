import DestinationCards from './DestinationCards';
import { Destinations, type DestinationVariant } from '../../data/destinations';

type Props = { variant: DestinationVariant };

export default function DestinationSection({ variant }: Props) {
  const section = Destinations[variant];

  return (
    <section className="flex flex-col gap-4">
      <h2>{section.title}</h2>
      <DestinationCards items={section.items} />
    </section>
  );
}
