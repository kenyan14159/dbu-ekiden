import Hero from '@/app/components/home/Hero';
import LatestTopics from '@/app/components/home/LatestTopics';
import TeamInfo from '@/app/components/home/TeamInfo';
import TeamLinks from '@/app/components/home/TeamLinks';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <LatestTopics />
      <TeamLinks />
      <TeamInfo />
    </main>
  );
}
