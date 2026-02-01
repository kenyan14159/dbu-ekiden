import Hero from '@/app/components/home/Hero';
import LatestResults from '@/app/components/home/LatestResults';
import TeamInfo from '@/app/components/home/TeamInfo';
import TeamLinks from '@/app/components/home/TeamLinks';
import ObNewsPreview from '@/app/components/home/ObNewsPreview';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <LatestResults />
      <ObNewsPreview />
      <TeamLinks />
      <TeamInfo />
    </main>
  );
}
