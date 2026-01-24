import Hero from '@/app/components/home/Hero';
import LatestTopics from '@/app/components/home/LatestTopics';
import TeamInfo from '@/app/components/home/TeamInfo';
import TeamLinks from '@/app/components/home/TeamLinks';
import ObNewsPreview from '@/app/components/home/ObNewsPreview';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <LatestTopics />
      <ObNewsPreview />
      <TeamLinks />
      <TeamInfo />
    </main>
  );
}
